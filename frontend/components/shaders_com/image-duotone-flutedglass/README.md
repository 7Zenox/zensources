# image-duotone-flutedglass

Replicated from shaders.com preset `c6559677-f2ee-4c0f-9291-46a825a41648`.

## Stack

```
ImageTexture  — cover-fit photo (8 MB PNG, saved as source.png)
Duotone       — colorA #0f0f0f → colorB #f9f5ff, blend 0.78, linear colorSpace
FlutedGlass   — bars shape, angle 0°, frequency 13, refraction 4, speed 0.05
```

## What it looks like

Any photo converted to near-monochrome via duotone (dark charcoal → off-white lavender, blend 0.78), then vertical fluted-glass bars drift slowly across the surface (speed 0.05, refraction 4, no chromatic aberration, no highlight). The result looks like a photo seen through frosted architectural glass.

## Customising

The component accepts an `imageUrl` prop — swap for any photo URL or local `/public` path:

```tsx
<ImageDuotoneFlutedGlass imageUrl="/my-photo.jpg" />
```

Duotone palette ideas:
- Warm: `colorA="#1a0a00"` `colorB="#fff8e7"`
- Cool: `colorA="#000a1a"` `colorB="#e8f4ff"`
- Tinted: `colorA="#0d0d0d"` `colorB="#e8d5ff"` (lavender)

## Assets

| File | Source |
|------|--------|
| `source.png` | Original preset photo (8 MB), downloaded from shaders.com CDN |

## Usage

```tsx
import ImageDuotoneFlutedGlass from "./index";

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <ImageDuotoneFlutedGlass />
  {/* or with your own image: */}
  <ImageDuotoneFlutedGlass imageUrl="/your-photo.jpg" />
</div>
```

## Dependencies

```bash
npm install shaders --legacy-peer-deps
```
