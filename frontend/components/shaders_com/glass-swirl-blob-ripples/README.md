# glass-swirl-blob-ripples

Replicated from shaders.com preset `b2917e68-297c-4e3d-946c-f5f13fd8b54b`.

## Stack

```
SolidColor (#0f0f0f)
└── Glass (custom SVG shape, cutout, refraction 0.82, aberration 0.5, fresnel #91b2ff)
    ├── Swirl          — blue/dark base, oklab colorSpace, detail 3.5
    ├── Blob           — mouse-tracking (linearDodge blend), follows cursor with momentum
    ├── WaveDistortion — sine wave at 23°, strength 0.15
    └── CursorRipples  — intensity 20, chromatic split 2
FilmGrain (strength 0.075, subtle)
```

## Notable details

- **Glass children** render *inside* the glass shape — the Swirl, Blob, WaveDistortion and CursorRipples are all composited within the glass boundary before refraction is applied.
- **Blob center** uses a `mouse-position` PropDriver — the blob tracks the cursor with `reach: 0.55` and `smoothing: 0.3`.
- **Shape assets** are a custom SVG bracket/C-shape. The SVG and pre-computed SDF binary are both referenced from shaders.com CDN (saved locally in `shape.svg` for reference).

## Assets

| File | URL |
|------|-----|
| `shape.svg` | `https://data.shaders.com/.../0BcePLcgQIx8.svg` |
| SDF binary (1 MB) | `https://data.shaders.com/.../5T7CT5qxxArz_sdf.bin` |

To self-host: download the SDF binary, serve it statically, and update `SHAPE_SDF_URL` in `index.tsx`.

## Usage

```tsx
import GlassSwirlBlobRipples from "./index";

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <GlassSwirlBlobRipples />
</div>
```

## Dependencies

```bash
npm install shaders --legacy-peer-deps
```
