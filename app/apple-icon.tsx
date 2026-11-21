import { ImageResponse } from "next/og";
import { flowerDataUri } from "@/lib/flower-svg";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: "#2a0f18",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={flowerDataUri("rosa")} width={150} height={150} alt="" />
      </div>
    ),
    size,
  );
}
