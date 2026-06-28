import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

function DatapexMark() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="58" height="58" rx="16" fill="#ffffff" />
      <path
        fill="#1198E0"
        fillRule="evenodd"
        d="M12 14h18c12.703 0 23 8.775 23 18s-10.297 18-23 18H12zm10 12v12h8c6.075 0 11-2.686 11-6s-4.925-6-11-6z"
        clipRule="evenodd"
      />
      <path d="M42 14h13L43 30 37 22z" fill="#22C7C9" />
      <path d="M44 34 55 50H42L36 42z" fill="#22C7C9" />
      <path d="M30 50h13.5C48.6 39.4 56.2 31.1 61 27H49.5C42.5 31.2 35.8 39 30 50Z" fill="#FF7F2A" />
    </svg>
  );
}

export default function Icon() {
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
        }}
      >
        <div
          style={{
            width: "84%",
            height: "84%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DatapexMark />
        </div>
      </div>
    ),
    size,
  );
}
