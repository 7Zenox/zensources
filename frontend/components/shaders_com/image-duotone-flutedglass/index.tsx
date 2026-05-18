"use client";
import { Shader, ImageTexture, Duotone, FlutedGlass } from "shaders/react";

/**
 * Replicated from shaders.com preset: c6559677-f2ee-4c0f-9291-46a825a41648
 *
 * Stack:
 *   ImageTexture  — cover-fit photo (swap for any image URL)
 *   Duotone       — near-black (#0f0f0f) → off-white (#f9f5ff), blend 0.78
 *   FlutedGlass   — vertical bars, frequency 13, refraction 4, no highlight/aberration
 *
 * Swap IMAGE_URL for any photo. The duotone converts it to a near-monochrome
 * palette, and the fluted glass applies slow-drifting vertical refraction bars.
 */

const IMAGE_URL = "https://data.shaders.com/storage/v1/object/public/user-uploaded-images/user_33nh0FG48zZa0rIUZuK7vgwPfZe/e7Jy8b5il0_q.png";

interface Props {
  /** Override the background image. Defaults to the original preset photo. */
  imageUrl?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function ImageDuotoneFlutedGlass({ imageUrl = IMAGE_URL, style, className }: Props) {
  return (
    <Shader
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }}
      className={className}
    >
      {/* Layer 1: Background photo, cover-fit */}
      <ImageTexture url={imageUrl} objectFit="cover" blendMode="normal" />

      {/* Layer 2: Duotone — dark to off-white, blend 0.78 */}
      <Duotone
        colorA="#0f0f0f"
        colorB="#f9f5ff"
        blend={0.78}
        colorSpace="linear"
        blendMode="normal"
      />

      {/* Layer 3: Fluted glass — slow vertical bars, refraction 4, no chromatic split */}
      <FlutedGlass
        shape="bars"
        angle={0}
        frequency={13}
        softness={1}
        speed={0.05}
        refraction={4}
        aberration={0}
        highlight={0}
        highlightColor="#ffffff"
        highlightSoftness={0}
        lightAngle={-90}
        waveAmplitude={0.06}
        waveFrequency={1.5}
        edges="mirror"
        blendMode="normal"
      />
    </Shader>
  );
}
