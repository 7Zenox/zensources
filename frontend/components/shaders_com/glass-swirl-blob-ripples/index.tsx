"use client";
import {
  Shader,
  SolidColor,
  Glass,
  Swirl,
  Blob,
  WaveDistortion,
  CursorRipples,
  FilmGrain,
} from "shaders/react";

/**
 * Replicated from shaders.com preset: b2917e68-297c-4e3d-946c-f5f13fd8b54b
 *
 * Stack:
 *   SolidColor (#0f0f0f)
 *   └── Glass (custom SVG shape, cutout, fresnel rim, chromatic aberration)
 *       ├── Swirl        (blue-to-dark, oklab colorSpace)
 *       ├── Blob         (mouse-tracking, linearDodge blend)
 *       ├── WaveDistortion
 *       └── CursorRipples
 *   FilmGrain (subtle)
 *
 * The Glass shape is a custom SVG bracket/C-shape from shaders.com CDN.
 * The SDF binary (required for SVG glass mode) is also referenced from CDN.
 * Both assets are saved locally in this directory for reference.
 */

const SHAPE_SVG_URL = "https://data.shaders.com/storage/v1/object/public/user-uploaded-images/user_33nh0FG48zZa0rIUZuK7vgwPfZe/0BcePLcgQIx8.svg";
const SHAPE_SDF_URL = "https://data.shaders.com/storage/v1/object/public/user-uploaded-images/user_33nh0FG48zZa0rIUZuK7vgwPfZe/5T7CT5qxxArz_sdf.bin";

const SHAPE_CONFIG = JSON.stringify({ type: "svg", svgUrl: SHAPE_SVG_URL });

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

export default function GlassSwirlBlobRipples({ style, className }: Props) {
  return (
    <Shader
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }}
      className={className}
    >
      {/* Layer 1: Dark background */}
      <SolidColor color="#0f0f0f" />

      {/* Layer 2: Glass shape — SVG bracket rendered with refraction, fresnel, aberration */}
      <Glass
        scale={1.1}
        center={{ x: 0.5, y: 0.5 }}
        cutout={true}
        refraction={0.82}
        thickness={0.37}
        aberration={0.5}
        blur={0}
        edgeSoftness={0.1}
        highlight={0.1}
        highlightColor="#dbe6ff"
        highlightSoftness={0.27}
        lightAngle={289}
        fresnel={0.13}
        fresnelSoftness={0.48}
        fresnelColor="#91b2ff"
        tintColor="#ffffff"
        tintIntensity={0}
        tintPreserveLuminosity={true}
        innerZoom={1}
        shape={SHAPE_CONFIG}
        shapeSdfUrl={SHAPE_SDF_URL}
        shapeType="svg"
        blendMode="normal"
      >
        {/* Children render inside the glass */}

        {/* Swirl base — blue/dark in oklab colour space */}
        <Swirl
          colorA="#ccf2ff"
          colorB="#191921"
          speed={0.6}
          detail={3.5}
          blend={45}
          colorSpace="oklab"
          blendMode="normal"
        />

        {/* Blob that follows the cursor, linearDodge blend */}
        <Blob
          colorA="#4e587891"
          colorB="#3b4b6b"
          size={0.15}
          speed={0.5}
          deformation={0.9}
          softness={0.7}
          seed={1}
          highlightIntensity={0.5}
          highlightColor="#ffe11a"
          highlightX={0.3}
          highlightY={-0.3}
          highlightZ={0.4}
          center={{
            type: "mouse-position",
            reach: 0.55,
            originX: 0.5,
            originY: 0.5,
            momentum: 0.3,
            smoothing: 0.3,
          } as any}
          blendMode="linearDodge"
        />

        {/* Wave distortion — sine wave at 23° */}
        <WaveDistortion
          strength={0.15}
          frequency={5.1}
          speed={2.5}
          angle={23}
          waveType="sine"
          edges="mirror"
        />

        {/* Cursor ripples with chromatic split */}
        <CursorRipples
          intensity={20}
          decay={5}
          radius={0.7}
          chromaticSplit={2}
          edges="stretch"
        />
      </Glass>

      {/* Layer 3: Subtle film grain */}
      <FilmGrain strength={0.075} bias={2} animated={false} />
    </Shader>
  );
}
