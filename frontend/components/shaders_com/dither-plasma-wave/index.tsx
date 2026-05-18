"use client";
import { Shader, Dither, Plasma, WaveDistortion } from "shaders/react";

/**
 * Replicated from shaders.com preset: d5a89bed-af0f-43b1-a078-e60811c651c6
 *
 * Stack:
 *   Dither (bayer8, custom dark palette, pixelSize 7)
 *   └── Plasma        (white/black, low density, high contrast)
 *       WaveDistortion (square wave at 256°, strength 1)
 */

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

export default function DitherPlasmaWave({ style, className }: Props) {
  return (
    <Shader
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }}
      className={className}
    >
      {/* Dither wraps its children — output is posterised into the two colors */}
      <Dither
        pattern="bayer8"
        pixelSize={7}
        threshold={0.41}
        spread={1}
        colorMode="custom"
        colorA="#121214"
        colorB="#202124"
        blendMode="normal"
      >
        {/* Plasma: animated white/black base fed into the dither */}
        <Plasma
          colorA="#ffffff"
          colorB="#000000"
          density={0.3}
          speed={1}
          intensity={1.3}
          warp={0.4}
          contrast={0.9}
          balance={50}
          colorSpace="linear"
          blendMode="normal"
        />

        {/* Square wave distortion at 256° over the plasma before dithering */}
        <WaveDistortion
          strength={1}
          frequency={1.8}
          speed={1}
          angle={256}
          waveType="square"
          edges="mirror"
          blendMode="normal"
        />
      </Dither>
    </Shader>
  );
}
