"use client";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";

/**
 * Replicated from shaders.com preset: dd87173f-d236-4b7e-8cf6-605126302ccb
 *
 * Stack: Swirl → ChromaFlow → FlutedGlass → FilmGrain
 *
 * - Swirl:       dark swirling base
 * - ChromaFlow:  directional colour that reacts to cursor movement direction
 * - FlutedGlass: refractive fluted glass at 120° with chromatic aberration
 * - FilmGrain:   very subtle static grain on top
 *
 * Source obtained by XOR-decrypting the shaders.com API response:
 *   GET https://shaders.com/api/preview/preset/<id>
 *   Key: "shaders-preview-key" (hardcoded in shaders/dist/react/Preview.js)
 */

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

export default function SwirlChromaFlowFlutedGlass({ style, className }: Props) {
  return (
    <Shader
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }}
      className={className}
    >
      {/* Layer 1: Swirl base */}
      <Swirl
        colorA="#000000"
        colorB="#0a0a0a"
        speed={1}
        detail={1.7}
        blend={50}
      />

      {/* Layer 2: ChromaFlow — directional colour from cursor movement */}
      <ChromaFlow
        baseColor="#18181a"
        upColor="#f5fff0"
        downColor="#b5b5b5"
        leftColor="#4f4f4f"
        rightColor="#ebebeb"
        radius={3}
        momentum={13}
        intensity={1}
        blendMode="normal"
      />

      {/* Layer 3: FlutedGlass — refractive rounded flutes at 120° */}
      <FlutedGlass
        shape="rounded"
        angle={120}
        frequency={8}
        softness={1}
        speed={0.15}
        refraction={4}
        aberration={0.61}
        highlight={0.12}
        highlightColor="#ffffff"
        highlightSoftness={0}
        lightAngle={-90}
        waveAmplitude={0.06}
        waveFrequency={1.5}
        edges="mirror"
        blendMode="normal"
      />

      {/* Layer 4: Subtle static film grain */}
      <FilmGrain strength={0.05} bias={2} animated={false} />
    </Shader>
  );
}
