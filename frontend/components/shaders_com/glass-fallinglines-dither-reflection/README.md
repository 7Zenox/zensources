# glass-fallinglines-dither-reflection

Replicated from shaders.com preset `070b7d0d-de86-4019-832f-28b989955fb3`.

## Stack

```
SolidColor (#000000)
Glass (SVG shape, scale 0.65, cutout, refraction 2, highlight #ef40ff, innerZoom 1.2)
├── FallingLines  — pink (#f21cd2) → lime (#cdd68c), angle 272°, density 60, trail 0.15
└── Pixelate      — scale 50 (coarsens the FallingLines inside the glass boundary)
Dither            — bayer2, pixelSize 2, source colorMode (full-canvas pass)
ReflectivePlane   — height 0.75, blur 4.7, distance 0.59 (blurred floor reflection)
```

## What it looks like

A black background with an SVG shape rendered as a glass lens. Inside the glass, pink-to-lime falling lines are pixelated (scale 50) before the glass refraction is applied. A full-canvas bayer2 dither pass at pixelSize 2 posterises the entire scene in source colors. A blurred floor reflection sits at the bottom three-quarters of the frame.

## Notable details

- **Pixelate inside Glass** — the `Pixelate` child coarsens the `FallingLines` *before* the glass refraction warps it, creating a chunky pixel-art effect through the lens.
- **Dither colorMode "source"** — unlike the dither-plasma-wave preset which uses `"custom"` colors, this uses `"source"` so the dither preserves the original hues rather than mapping to two fixed colors.
- **ReflectivePlane** — mirrors and blurs the content above `height: 0.75`, fading out over `distance: 0.59` with a wide `falloff: 1.91`.

## Assets

| File | URL |
|------|-----|
| `shape.svg` | `https://data.shaders.com/.../hfG4CFznLMks.svg` |
| SDF binary (1 MB) | `https://data.shaders.com/.../UGhd-3-7xDaU_sdf.bin` |

## Usage

```tsx
import GlassFallingLinesDitherReflection from "./index";

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <GlassFallingLinesDitherReflection />
</div>
```

## Dependencies

```bash
npm install shaders --legacy-peer-deps
```
