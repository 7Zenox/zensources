# dither-plasma-wave

Replicated from shaders.com preset `d5a89bed-af0f-43b1-a078-e60811c651c6`.

## Stack

```
Dither (bayer8, pixelSize 7, threshold 0.41, colorA #121214, colorB #202124)
├── Plasma        — white/black, density 0.3, intensity 1.3, warp 0.4, contrast 0.9
└── WaveDistortion — square wave at 256°, strength 1, frequency 1.8, edges mirror
```

## What it looks like

Animated plasma noise fed through a square wave distortion, then posterised into two near-black colours via a Bayer-8 dither pattern. The result is a dark, textured, shifting grid — subtle at small pixel sizes, graphic and visible at `pixelSize 7`.

## Tuning tips

| Prop | Effect |
|------|--------|
| `pixelSize` | Larger = more visible dither grid |
| `colorA` / `colorB` | Swap to light colours for an inverted look |
| `threshold` | Lower = more dark dots, higher = more light dots |
| `Plasma.density` | Higher = tighter, more chaotic pattern |
| `WaveDistortion.strength` | Higher = more distorted input into dither |

## Usage

```tsx
import DitherPlasmaWave from "./index";

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <DitherPlasmaWave />
</div>
```

## Dependencies

```bash
npm install shaders --legacy-peer-deps
```
