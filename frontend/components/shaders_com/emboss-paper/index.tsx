"use client";
import { Shader, SolidColor, Emboss, Paper } from "shaders/react";

/**
 * Replicated from shaders.com preset: c99c2247-6824-4f95-95e9-f6abcaa86d0b
 *
 * Stack:
 *   SolidColor (#f5f2eb) — warm off-white base
 *   Emboss     — debossed SVG shape, lightAngle tracks mouse X axis
 *   Paper      — subtle surface roughness and fiber displacement on top
 *
 * The Emboss lightAngle uses a mouse PropDriver: as the cursor moves
 * horizontally, the light angle shifts between 240° and 311°, making
 * the debossed shape appear to catch light dynamically.
 */

const SHAPE_SVG_URL = "https://data.shaders.com/storage/v1/object/public/user-uploaded-images/user_33nh0FG48zZa0rIUZuK7vgwPfZe/c4ui02UpO1VE.svg";
const SHAPE_SDF_URL = "https://data.shaders.com/storage/v1/object/public/user-uploaded-images/user_33nh0FG48zZa0rIUZuK7vgwPfZe/LxxV4-VS2bDS_sdf.bin";

const SHAPE_CONFIG = JSON.stringify({ type: "svg", svgUrl: SHAPE_SVG_URL });

// Mouse PropDriver: lightAngle shifts 240°–311° as cursor moves on X axis
const LIGHT_ANGLE_DRIVER = {
  axis: "x",
  type: "mouse",
  curve: 0.4,
  momentum: 0.15,
  outputMax: 311,
  outputMin: 240,
  smoothing: 0.2,
};

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

export default function EmbossPaper({ style, className }: Props) {
  return (
    <Shader
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }}
      className={className}
    >
      {/* Layer 1: Warm off-white base */}
      <SolidColor color="#f5f2eb" />

      {/* Layer 2: Debossed SVG shape — depth -0.95 = strongly inset */}
      <Emboss
        center={{ x: 0.5, y: 0.5 }}
        scale={1}
        depth={-0.95}
        lightAngle={LIGHT_ANGLE_DRIVER as any}
        lightIntensity={0.35}
        shadowIntensity={0.5}
        shape={SHAPE_CONFIG}
        shapeSdfUrl={SHAPE_SDF_URL}
        shapeType="svg"
        blendMode="normal"
      />

      {/* Layer 3: Paper texture — roughness + fiber displacement */}
      <Paper
        roughness={0.3}
        grainScale={1}
        displacement={0.15}
        seed={0}
        blendMode="normal"
      />
    </Shader>
  );
}
