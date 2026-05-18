# swirl-chromaflow-flutedglass

Replicated from shaders.com preset `dd87173f-d236-4b7e-8cf6-605126302ccb`.

## Stack

| Order | Component | Role |
|-------|-----------|------|
| 1 | `Swirl` | Dark swirling base (`#000` → `#0a0a0a`) |
| 2 | `ChromaFlow` | Directional colour that reacts to cursor movement |
| 3 | `FlutedGlass` | Refractive rounded flutes at 120°, chromatic aberration 0.61 |
| 4 | `FilmGrain` | Very subtle static grain (strength 0.05) |

## Usage

```tsx
import SwirlChromaFlowFlutedGlass from "./index";

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <SwirlChromaFlowFlutedGlass />
</div>
```

## Dependencies

```bash
npm install shaders --legacy-peer-deps
```

## How it was decoded

The `Preview` component in the `shaders` npm package fetches preset data from
`https://shaders.com/api/preview/preset/<id>` as a base64 XOR-encrypted blob.
The decryption key `"shaders-preview-key"` is hardcoded in
`node_modules/shaders/dist/react/Preview.js`.

```js
const res = await fetch("https://shaders.com/api/preview/preset/dd87173f-d236-4b7e-8cf6-605126302ccb");
const { preset } = await res.json();
// XOR-decrypt preset.definition with "shaders-preview-key", base64-decode, JSON.parse
```
