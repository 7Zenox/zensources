"use client";
import { Shader, ImageTexture, Glass } from "shaders/react";

/**
 * Replicated from shaders.com preset: a61a3409-0486-4706-b38c-5f4bbfb2c336
 *
 * Stack:
 *   ImageTexture — cover-fit photo
 *   Glass        — circle SDF shape, tracks mouse, innerZoom 1.7 (magnifier lens)
 *
 * A circular glass lens follows the cursor across the photo, magnifying
 * the content beneath it (innerZoom 1.7) with subtle refraction and
 * chromatic aberration. No cutout — the lens sits on top of the image.
 */

const IMAGE_URL = "https://data.shaders.com/storage/v1/object/public/user-uploaded-images/user_33nh0FG48zZa0rIUZuK7vgwPfZe/LZa9mfBjaqRg.jpg";

// Circle SDF shape — built-in, no SVG/SDF asset needed
const CIRCLE_SHAPE = JSON.stringify({ type: "circleSDF", radius: 0.35 });

// Mouse PropDriver — lens center tracks cursor with momentum + smoothing
const MOUSE_CENTER = {
  type: "mouse-position",
  reach: 1,
  originX: 0.5,
  originY: 0.5,
  momentum: 0.25,
  smoothing: 0.15,
};

interface Props {
  /** Override the background image. Defaults to the original preset photo. */
  imageUrl?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function ImageGlassMagnifier({ imageUrl = IMAGE_URL, style, className }: Props) {
  return (
    <Shader
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }}
      className={className}
    >
      {/* Layer 1: Background photo */}
      <ImageTexture url={imageUrl} objectFit="cover" blendMode="normal" />

      {/* Layer 2: Circular magnifier lens that follows the cursor */}
      <Glass
        scale={1}
        center={MOUSE_CENTER as any}
        shape={CIRCLE_SHAPE}
        shapeType="circleSDF"
        shapeSdfUrl=""
        cutout={false}
        refraction={0.46}
        thickness={0.04}
        aberration={0.5}
        blur={0}
        edgeSoftness={0.1}
        innerZoom={1.7}
        highlight={0.05}
        highlightColor="#ffffff"
        highlightSoftness={0.5}
        lightAngle={300}
        fresnel={0.05}
        fresnelSoftness={0.06}
        fresnelColor="#ffffff"
        tintColor="#ffffff"
        tintIntensity={0}
        tintPreserveLuminosity={true}
        blendMode="normal"
      />
    </Shader>
  );
}
