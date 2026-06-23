import { ImageResponse } from "next/og";

// Dynamic 1200x630 Open Graph / Twitter card image.
export const runtime = "edge";
export const alt = "Jesse Wright — Trustworthy AI for a decentralized Web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(135deg, #0a0a0a 0%, #14213d 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 34,
          color: "#5EA2EF",
          fontWeight: 600,
          marginBottom: 24,
        }}
      >
        Jesse Wright
      </div>
      <div
        style={{
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1.1,
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        Trustworthy AI for a decentralized Web
      </div>
      <div
        style={{
          fontSize: 30,
          color: "#a0a0a0",
          marginTop: 32,
        }}
      >
        Solid Lead at the Open Data Institute · DPhil candidate, University of
        Oxford
      </div>
    </div>,
    { ...size },
  );
}
