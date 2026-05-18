"use client";
import {
  Shader,
  SolidColor,
  Glass,
  FallingLines,
  Pixelate,
  Dither,
  ReflectivePlane,
} from "shaders/react";

/**
 * Replicated from shaders.com preset: 070b7d0d-de86-4019-832f-28b989955fb3
 *
 * Stack:
 *   SolidColor (#000000)
 *   Glass (SVG shape, cutout, highlight #ef40ff, refraction 2, innerZoom 1.2)
 *   ├── FallingLines (pink→lime, near-vertical, density 60, pixelated trail)
 *   └── Pixelate     (scale 50 — pixelates the FallingLines inside the glass)
 *   Dither           (bayer2, source colorMode, pixelSize 2 — full-canvas dither pass)
 *   ReflectivePlane  (blurred floor reflection, height 0.75)
 */

const SHAPE_SVG_URL = "https://data.shaders.com/storage/v1/object/public/user-uploaded-images/user_33nh0FG48zZa0rIUZuK7vgwPfZe/hfG4CFznLMks.svg";
const SHAPE_SDF_URL = "https://data.shaders.com/storage/v1/object/public/user-uploaded-images/user_33nh0FG48zZa0rIUZuK7vgwPfZe/UGhd-3-7xDaU_sdf.bin";
const SHAPE_CONFIG = JSON.stringify({ type: "svg", svgUrl: SHAPE_SVG_URL });

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

export default function GlassFallingLinesDitherReflection({ style, className }: Props) {
  return (
    <Shader
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }}
      className={className}
    >
      {/* Layer 1: Black base */}
      <SolidColor color="#000000" />

      {/* Layer 2: Glass shape — SVG bracket, pink highlight, strong refraction */}
      <Glass
        scale={0.65}
        center={{ x: 0.5, y: 0.5 }}
        cutout={true}
        refraction={2}
        thickness={0.24}
        aberration={0}
        blur={0}
        edgeSoftness={0.2}
        highlight={0.8}
        highlightColor="#ef40ff"
        highlightSoftness={0.5}
        lightAngle={300}
        fresnel={0}
        fresnelSoftness={0}
        fresnelColor="#ffffff"
        tintColor="#ffffff"
        tintIntensity={0}
        tintPreserveLuminosity={true}
        innerZoom={1.2}
        shape={SHAPE_CONFIG}
        shapeSdfUrl={SHAPE_SDF_URL}
        shapeType=""
        blendMode="normal"
      >
        {/* FallingLines: pink-to-lime streaks falling near-vertically */}
        <FallingLines
          colorA="#f21cd2"
          colorB="#cdd68c"
          colorSpace="linear"
          angle={272}
          speed={0.25}
          speedVariance={0.8}
          density={60}
          trailLength={0.15}
          balance={0.5}
          strokeWidth={0.76}
          rounding={0}
          blendMode="normal"
        />

        {/* Pixelate: coarsens the FallingLines inside the glass */}
        <Pixelate
          scale={50}
          gap={0}
          roundness={0}
          blendMode="normal"
        />
      </Glass>

      {/* Layer 3: Full-canvas bayer2 dither in source colorMode */}
      <Dither
        pattern="bayer2"
        pixelSize={2}
        threshold={0.5}
        spread={1}
        colorMode="source"
        colorA="transparent"
        colorB="#ffffff"
        blendMode="normal"
      />

      {/* Layer 4: Blurred floor reflection */}
      <ReflectivePlane
        height={0.75}
        distance={0.59}
        falloff={1.91}
        blur={4.7}
        blurDistance={0.14}
        edges="stretch"
        blendMode="normal"
      />
    </Shader>
  );
}
