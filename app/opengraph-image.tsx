import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";
import { flowerDataUri } from "@/lib/flower-svg";

export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontsDir = join(process.cwd(), "assets/fonts");

export default async function Image() {
  const [cormorant, jost] = await Promise.all([
    readFile(join(fontsDir, "cormorant-500-italic.woff")),
    readFile(join(fontsDir, "jost-400.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "radial-gradient(ellipse at 30% 40%, #4a1b2a 0%, #2a0f18 60%, #170810 100%)",
          color: "#fbf6f0",
          fontFamily: "Jost",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flowerDataUri("rosa")}
          width={520}
          height={520}
          alt=""
          style={{ position: "absolute", right: -60, top: 55, opacity: 0.95 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flowerDataUri("durazno")}
          width={170}
          height={170}
          alt=""
          style={{ position: "absolute", right: 430, bottom: 40 }}
        />
        <div style={{ display: "flex", flexDirection: "column", paddingLeft: 80, maxWidth: 720 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#e9c987",
            }}
          >
            <div style={{ width: 50, height: 2, background: "#c9a15b" }} />
            Florería en {SITE.city}
          </div>
          <div style={{ fontFamily: "Cormorant", fontSize: 110, lineHeight: 1, marginTop: 24 }}>
            {SITE.name}
          </div>
          <div style={{ fontSize: 32, marginTop: 24, color: "rgba(251,246,240,0.8)" }}>{SITE.tagline}</div>
          <div
            style={{
              display: "flex",
              marginTop: 44,
              fontSize: 24,
              padding: "14px 28px",
              borderRadius: 999,
              background: "#25D366",
              color: "white",
              alignSelf: "flex-start",
            }}
          >
            Pedidos por WhatsApp {SITE.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: cormorant, style: "italic", weight: 500 },
        { name: "Jost", data: jost, style: "normal", weight: 400 },
      ],
    },
  );
}
