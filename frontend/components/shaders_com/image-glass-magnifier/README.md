# image-glass-magnifier

Replicated from shaders.com preset `a61a3409-0486-4706-b38c-5f4bbfb2c336`.

## Stack

```
ImageTexture — cover-fit photo (1.3 MB JPG, saved as source.jpg)
Glass        — circleSDF shape, mouse-tracking center, innerZoom 1.7
```

## What it looks like

A photo with a circular magnifying glass lens that follows the cursor. The lens magnifies the image beneath it (innerZoom 1.7) with gentle refraction (0.46), chromatic aberration (0.5), and a barely-visible fresnel rim. No cutout — the glass sits on top of the photo without masking anything out.

## Notable: built-in circleSDF shape

Unlike the other Glass presets that use custom SVG + SDF binary assets, this one uses the built-in `circleSDF` shape type — no external files required:

```ts
const CIRCLE_SHAPE = JSON.stringify({ type: "circleSDF", radius: 0.35 });
```

## Mouse PropDriver on center

The lens center tracks the cursor:

```ts
{
  type: "mouse-position",
  reach: 1,          // follows cursor across full viewport
  originX: 0.5,      // rests at center when idle
  originY: 0.5,
  momentum: 0.25,    // slight lag/inertia
  smoothing: 0.15,   // easing
}
```

Reduce `momentum` toward 0 for snappier tracking, increase toward 1 for more floaty inertia.

## Customising

```tsx
// Use your own image
<ImageGlassMagnifier imageUrl="/your-photo.jpg" />
```

To change lens size: adjust `radius` in `CIRCLE_SHAPE` (0.1–0.5).
To change magnification: adjust `innerZoom` (1 = no zoom, 2 = 2× magnification).

## Assets

| File | Source |
|------|--------|
| `source.jpg` | Original preset photo (1.3 MB), downloaded from shaders.com CDN |

## Usage

```tsx
import ImageGlassMagnifier from "./index";

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <ImageGlassMagnifier />
</div>
```

## Dependencies

```bash
npm install shaders --legacy-peer-deps
```
