import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

function AudentiaTriangleMark() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="190" fill="#D4C994" />
      <path d="M200 50 347.22 305H52.78Z" fill="#356B47" />
      <path d="M200 101 303.05 279.5H96.95Z" fill="#0D1F2D" />
      <path d="M200 135 273.61 262.5H126.39Z" fill="#FFFFFF" />
      <path d="M200 186 229.44 237H170.56Z" fill="#D4C994" />
    </svg>
  );
}

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          padding: "14px",
        }}
      >
        <AudentiaTriangleMark />
      </div>
    ),
    size,
  );
}
