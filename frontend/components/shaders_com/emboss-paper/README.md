# emboss-paper

Replicated from shaders.com preset `c99c2247-6824-4f95-95e9-f6abcaa86d0b`.

## Stack

```
SolidColor  — #f5f2eb (warm off-white)
Emboss      — debossed SVG shape, depth -0.95, lightAngle mouse-driven (240°–311°)
Paper       — roughness 0.3, displacement 0.15, grain overlay
```

## What it looks like

A warm off-white surface with a custom SVG shape pressed into it (debossed, depth -0.95). Moving the cursor left/right shifts the light angle between 240° and 311°, making the inset shape catch and lose light in real time. Paper texture adds fiber grain and micro-displacement on top, making the surface feel physical.

## Notable: mouse PropDriver on lightAngle

The `lightAngle` prop uses a PropDriver object instead of a static number:

```ts
{
  axis: "x",       // tracks horizontal mouse movement
  type: "mouse",
  curve: 0.4,       // easing curve
  momentum: 0.15,
  outputMin: 240,   // light angle at left edge
  outputMax: 311,   // light angle at right edge
  smoothing: 0.2,
}
```

This is the same `PropDriver` pattern used by the `Blob` mouse-tracking center in other presets.

## Assets

| File | URL |
|------|-----|
| `shape.svg` | `https://data.shaders.com/.../c4ui02UpO1VE.svg` |
| SDF binary (1 MB) | `https://data.shaders.com/.../LxxV4-VS2bDS_sdf.bin` |

## Usage

```tsx
import EmbossPaper from "./index";

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <EmbossPaper />
</div>
```

## Dependencies

```bash
npm install shaders --legacy-peer-deps
```
