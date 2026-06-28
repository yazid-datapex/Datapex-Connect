const VERSION = 3;
const SIZE = VERSION * 4 + 17;
const DATA_CODEWORDS = 44;
const ECC_CODEWORDS = 26;
const MAX_BYTE_LENGTH = 42;
const REMAINDER_BITS = 7;
const ALIGNMENT_PATTERN_CENTERS = [6, 22] as const;
const FORMAT_POLYNOMIAL = 0x537;
const FORMAT_MASK = 0x5412;
const ERROR_CORRECTION_FORMAT_BITS = 0b00;

type Matrix = boolean[][];
type ReservedMatrix = boolean[][];

function appendBits(value: number, length: number, bits: number[]) {
  for (let bitIndex = length - 1; bitIndex >= 0; bitIndex -= 1) {
    bits.push((value >>> bitIndex) & 1);
  }
}

function multiplyGf(x: number, y: number) {
  let z = 0;

  for (let value = y; value > 0; value >>>= 1) {
    if ((value & 1) !== 0) {
      z ^= x;
    }

    x <<= 1;

    if ((x & 0x100) !== 0) {
      x ^= 0x11d;
    }
  }

  return z;
}

function computeReedSolomonDivisor(degree: number) {
  const result = new Array(degree).fill(0);
  result[degree - 1] = 1;

  let root = 1;

  for (let degreeIndex = 0; degreeIndex < degree; degreeIndex += 1) {
    for (let coefficientIndex = 0; coefficientIndex < degree; coefficientIndex += 1) {
      result[coefficientIndex] = multiplyGf(result[coefficientIndex], root);

      if (coefficientIndex + 1 < degree) {
        result[coefficientIndex] ^= result[coefficientIndex + 1];
      }
    }

    root = multiplyGf(root, 0x02);
  }

  return result;
}

function computeReedSolomonRemainder(data: number[], divisor: number[]) {
  const result = new Array(divisor.length).fill(0);

  for (const codeword of data) {
    const factor = codeword ^ result.shift()!;
    result.push(0);

    for (let index = 0; index < divisor.length; index += 1) {
      result[index] ^= multiplyGf(divisor[index], factor);
    }
  }

  return result;
}

function encodeText(text: string) {
  const bytes = Array.from(new TextEncoder().encode(text));

  if (bytes.length > MAX_BYTE_LENGTH) {
    throw new Error(
      "QR payload exceeds the supported capacity for the current generator.",
    );
  }

  const bits: number[] = [];
  appendBits(0b0100, 4, bits);
  appendBits(bytes.length, 8, bits);

  for (const byte of bytes) {
    appendBits(byte, 8, bits);
  }

  const maxDataBits = DATA_CODEWORDS * 8;
  const terminatorLength = Math.min(4, maxDataBits - bits.length);
  appendBits(0, terminatorLength, bits);

  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  const codewords: number[] = [];

  for (let index = 0; index < bits.length; index += 8) {
    let value = 0;

    for (let bitOffset = 0; bitOffset < 8; bitOffset += 1) {
      value = (value << 1) | bits[index + bitOffset]!;
    }

    codewords.push(value);
  }

  const padCodewords = [0xec, 0x11];

  while (codewords.length < DATA_CODEWORDS) {
    codewords.push(padCodewords[codewords.length % 2]!);
  }

  const divisor = computeReedSolomonDivisor(ECC_CODEWORDS);
  const remainder = computeReedSolomonRemainder(codewords, divisor);
  const finalBits: number[] = [];

  for (const codeword of [...codewords, ...remainder]) {
    appendBits(codeword, 8, finalBits);
  }

  for (let remainderIndex = 0; remainderIndex < REMAINDER_BITS; remainderIndex += 1) {
    finalBits.push(0);
  }

  return finalBits;
}

function createMatrix<T>(value: T) {
  return Array.from({ length: SIZE }, () => Array<T>(SIZE).fill(value));
}

function setFunctionModule(
  modules: Matrix,
  reserved: ReservedMatrix,
  x: number,
  y: number,
  value: boolean,
) {
  modules[y]![x] = value;
  reserved[y]![x] = true;
}

function drawFinderPattern(
  modules: Matrix,
  reserved: ReservedMatrix,
  x: number,
  y: number,
) {
  for (let rowOffset = -1; rowOffset <= 7; rowOffset += 1) {
    for (let columnOffset = -1; columnOffset <= 7; columnOffset += 1) {
      const currentX = x + columnOffset;
      const currentY = y + rowOffset;

      if (
        currentX < 0 ||
        currentX >= SIZE ||
        currentY < 0 ||
        currentY >= SIZE
      ) {
        continue;
      }

      const isBorder =
        columnOffset >= 0 &&
        columnOffset <= 6 &&
        (rowOffset === 0 || rowOffset === 6);
      const isVertical =
        rowOffset >= 0 &&
        rowOffset <= 6 &&
        (columnOffset === 0 || columnOffset === 6);
      const isCenter =
        rowOffset >= 2 &&
        rowOffset <= 4 &&
        columnOffset >= 2 &&
        columnOffset <= 4;

      setFunctionModule(
        modules,
        reserved,
        currentX,
        currentY,
        isBorder || isVertical || isCenter,
      );
    }
  }
}

function drawAlignmentPattern(
  modules: Matrix,
  reserved: ReservedMatrix,
  centerX: number,
  centerY: number,
) {
  for (let rowOffset = -2; rowOffset <= 2; rowOffset += 1) {
    for (let columnOffset = -2; columnOffset <= 2; columnOffset += 1) {
      const distance = Math.max(Math.abs(columnOffset), Math.abs(rowOffset));
      setFunctionModule(
        modules,
        reserved,
        centerX + columnOffset,
        centerY + rowOffset,
        distance !== 1,
      );
    }
  }
}

function drawFunctionPatterns(modules: Matrix, reserved: ReservedMatrix) {
  drawFinderPattern(modules, reserved, 0, 0);
  drawFinderPattern(modules, reserved, SIZE - 7, 0);
  drawFinderPattern(modules, reserved, 0, SIZE - 7);

  for (const centerY of ALIGNMENT_PATTERN_CENTERS) {
    for (const centerX of ALIGNMENT_PATTERN_CENTERS) {
      if (reserved[centerY]![centerX]) {
        continue;
      }

      drawAlignmentPattern(modules, reserved, centerX, centerY);
    }
  }

  for (let index = 8; index < SIZE - 8; index += 1) {
    const value = index % 2 === 0;
    setFunctionModule(modules, reserved, index, 6, value);
    setFunctionModule(modules, reserved, 6, index, value);
  }

  for (let index = 0; index <= 8; index += 1) {
    if (index !== 6) {
      setFunctionModule(modules, reserved, 8, index, false);
      setFunctionModule(modules, reserved, index, 8, false);
    }
  }

  for (let index = 0; index < 8; index += 1) {
    setFunctionModule(modules, reserved, SIZE - 1 - index, 8, false);
    setFunctionModule(modules, reserved, 8, SIZE - 1 - index, false);
  }

  setFunctionModule(modules, reserved, 8, SIZE - 8, true);
}

function drawCodewords(modules: Matrix, reserved: ReservedMatrix, bits: number[]) {
  let bitIndex = 0;
  let column = SIZE - 1;
  let upward = true;

  while (column > 0) {
    if (column === 6) {
      column -= 1;
    }

    for (let step = 0; step < SIZE; step += 1) {
      const row = upward ? SIZE - 1 - step : step;

      for (let columnOffset = 0; columnOffset < 2; columnOffset += 1) {
        const currentColumn = column - columnOffset;

        if (!reserved[row]![currentColumn] && bitIndex < bits.length) {
          modules[row]![currentColumn] = bits[bitIndex] === 1;
          bitIndex += 1;
        }
      }
    }

    upward = !upward;
    column -= 2;
  }
}

function shouldMask(mask: number, x: number, y: number) {
  switch (mask) {
    case 0:
      return (x + y) % 2 === 0;
    case 1:
      return y % 2 === 0;
    case 2:
      return x % 3 === 0;
    case 3:
      return (x + y) % 3 === 0;
    case 4:
      return (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0;
    case 5:
      return ((x * y) % 2) + ((x * y) % 3) === 0;
    case 6:
      return ((((x * y) % 2) + ((x * y) % 3)) % 2) === 0;
    case 7:
      return ((((x + y) % 2) + ((x * y) % 3)) % 2) === 0;
    default:
      return false;
  }
}

function applyMask(modules: Matrix, reserved: ReservedMatrix, mask: number) {
  return modules.map((row, y) =>
    row.map((value, x) => {
      if (reserved[y]![x]) {
        return value;
      }

      return shouldMask(mask, x, y) ? !value : value;
    }),
  );
}

function getFormatBits(mask: number) {
  const data = (ERROR_CORRECTION_FORMAT_BITS << 3) | mask;
  let remainder = data << 10;

  for (let bit = 14; bit >= 10; bit -= 1) {
    if (((remainder >>> bit) & 1) !== 0) {
      remainder ^= FORMAT_POLYNOMIAL << (bit - 10);
    }
  }

  return ((data << 10) | remainder) ^ FORMAT_MASK;
}

function drawFormatBits(modules: Matrix, reserved: ReservedMatrix, mask: number) {
  const bits = getFormatBits(mask);
  const getBit = (bitIndex: number) => ((bits >>> bitIndex) & 1) !== 0;

  for (let index = 0; index <= 5; index += 1) {
    setFunctionModule(modules, reserved, 8, index, getBit(index));
  }

  setFunctionModule(modules, reserved, 8, 7, getBit(6));
  setFunctionModule(modules, reserved, 8, 8, getBit(7));
  setFunctionModule(modules, reserved, 7, 8, getBit(8));

  for (let index = 9; index < 15; index += 1) {
    setFunctionModule(modules, reserved, 14 - index, 8, getBit(index));
  }

  for (let index = 0; index < 8; index += 1) {
    setFunctionModule(modules, reserved, SIZE - 1 - index, 8, getBit(index));
  }

  for (let index = 8; index < 15; index += 1) {
    setFunctionModule(modules, reserved, 8, SIZE - 15 + index, getBit(index));
  }

  setFunctionModule(modules, reserved, 8, SIZE - 8, true);
}

function getPenaltyScore(modules: Matrix) {
  let score = 0;

  const scoreRuns = (line: boolean[]) => {
    let runColor = line[0];
    let runLength = 1;

    for (let index = 1; index < line.length; index += 1) {
      if (line[index] === runColor) {
        runLength += 1;
        continue;
      }

      if (runLength >= 5) {
        score += runLength - 2;
      }

      runColor = line[index];
      runLength = 1;
    }

    if (runLength >= 5) {
      score += runLength - 2;
    }
  };

  for (const row of modules) {
    scoreRuns(row);
  }

  for (let column = 0; column < SIZE; column += 1) {
    const line = modules.map((row) => row[column]!);
    scoreRuns(line);
  }

  for (let row = 0; row < SIZE - 1; row += 1) {
    for (let column = 0; column < SIZE - 1; column += 1) {
      const value = modules[row]![column];

      if (
        value === modules[row]![column + 1] &&
        value === modules[row + 1]![column] &&
        value === modules[row + 1]![column + 1]
      ) {
        score += 3;
      }
    }
  }

  const patternA = [true, false, true, true, true, false, true, false, false, false, false];
  const patternB = [false, false, false, false, true, false, true, true, true, false, true];

  const scorePattern = (line: boolean[]) => {
    for (let index = 0; index <= line.length - patternA.length; index += 1) {
      const slice = line.slice(index, index + patternA.length);

      const matchesA = patternA.every((value, patternIndex) => slice[patternIndex] === value);
      const matchesB = patternB.every((value, patternIndex) => slice[patternIndex] === value);

      if (matchesA || matchesB) {
        score += 40;
      }
    }
  };

  for (const row of modules) {
    scorePattern(row);
  }

  for (let column = 0; column < SIZE; column += 1) {
    scorePattern(modules.map((row) => row[column]!));
  }

  let darkModules = 0;

  for (const row of modules) {
    for (const value of row) {
      if (value) {
        darkModules += 1;
      }
    }
  }

  const totalModules = SIZE * SIZE;
  const percentage = (darkModules * 100) / totalModules;
  const deviation = Math.abs(percentage - 50);
  score += Math.floor(deviation / 5) * 10;

  return score;
}

function buildMatrix(bits: number[]) {
  const modules = createMatrix(false);
  const reserved = createMatrix(false);
  drawFunctionPatterns(modules, reserved);
  drawCodewords(modules, reserved, bits);

  let bestMask = 0;
  let bestScore = Number.POSITIVE_INFINITY;

  for (let mask = 0; mask < 8; mask += 1) {
    const candidate = applyMask(modules, reserved, mask);
    drawFormatBits(candidate, reserved, mask);
    const score = getPenaltyScore(candidate);

    if (score < bestScore) {
      bestMask = mask;
      bestScore = score;
    }
  }

  const finalMatrix = applyMask(modules, reserved, bestMask);
  drawFormatBits(finalMatrix, reserved, bestMask);
  return finalMatrix;
}

export function buildQrCodeSvg(text: string) {
  const bits = encodeText(text);
  const matrix = buildMatrix(bits);
  const quietZone = 4;
  const viewBoxSize = SIZE + quietZone * 2;
  let path = "";

  for (let row = 0; row < SIZE; row += 1) {
    for (let column = 0; column < SIZE; column += 1) {
      if (!matrix[row]![column]) {
        continue;
      }

      path += "M" + (column + quietZone) + "," + (row + quietZone) + "h1v1h-1z";
    }
  }

  return [
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 " + viewBoxSize + " " + viewBoxSize + "' aria-hidden='true' role='img'>",
    "<rect width='" + viewBoxSize + "' height='" + viewBoxSize + "' fill='#ffffff' />",
    "<path d='" + path + "' fill='#0f172a' />",
    "</svg>",
  ].join("");
}
