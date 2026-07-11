import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 14,
          background: "#101010",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#d4a574",
          fontWeight: 800,
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          fontFamily: "monospace",
        }}
      >
        AK
      </div>
    ),
    {
      ...size,
    }
  );
}
