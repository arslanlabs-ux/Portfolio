import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0b0c",
          padding: 72,
          borderTop: "8px solid #34d17d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, backgroundColor: "#34d17d" }} />
          <div
            style={{
              color: "#949ba1",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            PCB Design · Embedded Systems · Electronics
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#e9ecee", fontSize: 84, lineHeight: 1.05, letterSpacing: -2 }}>
            {site.name}
          </div>
          <div style={{ color: "#34d17d", fontSize: 36, marginTop: 20 }}>
            {site.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #23282c",
            paddingTop: 28,
            color: "#676e74",
            fontSize: 24,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <div>Schematic · Layout · DRC · Manufacturing</div>
          <div>Rev 01</div>
        </div>
      </div>
    ),
    size,
  );
}
