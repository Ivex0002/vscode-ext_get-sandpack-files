# get-sandpack-files README

A VSCode extension that generates a strongly typed helper & raw file runtime provider(vite) file for `@codesandbox/sandpack-react` from a selected directory.

It scans your target folder, collects file names, and creates a `files.for.sandpack.ts` file with:

- typed `activeFile`
- typed `visibleFiles`
- runtime raw file loading via `import.meta.glob`
- filename autocomplete
- reduced string typo risk

---

## Usage gif

<img width="1355" height="734" alt="Honeycam 2026-05-04 16-06-02" src="https://github.com/user-attachments/assets/60a98b1d-7323-43f0-8630-9335365b17d4" />

## REQUIREMENT <span style="color:#e11d48; font-size:12px;" >!important</span >

- `@codesandbox/sandpack-react`
- `react`
- `vite`

## Why

Using Sandpack often looks like this:

```tsx
<Sandpack
  options={{
    activeFile: "/App.tsx",
    visibleFiles: ["/index.ts"],
  }}
/>
```

This approach has a few drawbacks:

- file paths are plain strings
- autocomplete is unavailable
- typos are easy to introduce
- non-existent files can be referenced
- refactoring file names is harder to track

~~plz sandpack bros add generic file name union~~

This extension generates a strict filename union type from your actual folder contents:

```ts
type FileNames = "/App.tsx" | "/index.ts" | "/styles.css";
```

Which enables:

```ts
type StrictOptions = {
  activeFile?: FileNames;
  visibleFiles?: FileNames[];
};
```

Your editor can then provide autocomplete and type checking like this
<img width="494" height="347" alt="화면 캡처 2026-05-03 165906" src="https://github.com/user-attachments/assets/c6b08163-c9fb-4df9-bd4d-5c125d929f6a" />

---

## Example

### Folder

```txt
example/
├── App.tsx
├── index.ts
└── styles.css
```

### Generated file

```ts
type FileNames = "/App.tsx" | "/index.ts" | "/styles.css";
```

```ts
// dirName can changed by user options
// "base", "parent", "both"
// default is "parent"
// take a look "naming" option
export const SPOptions_dirName = {
  create: createSandpackOptions,
};
```

```ts
async function createSandpackOptions(props?) {
  const files = await getRawFiles();

  return {
    ...props,
    files,
  };
}
```

---

## Usage

### 1. Select your Sandpack source folder

Example:

```txt
src/example/
```

### 2. run `Generate Sandpack Files`

<img width="441" height="92" alt="화면 캡처 2026-05-03 174139" src="https://github.com/user-attachments/assets/a46508e3-f59f-4d52-ab7e-af55d33a84d7" />

use Explorer context menu

or Open Command Palette:

```txt
Generate Sandpack Files
```

### 3. Generated output

```txt
src/
├── example/                // target dir
│   ├── App.tsx
│   ├── index.ts
│   └── styles.css
└── files.for.sandpack.ts   // output
```

---

## In your project

```ts
import { createSandpackOptions } from "./files.for.sandpack";

const sandpackProps = await createSandpackOptions({
  options: {
    activeFile: "/App.tsx",
    visibleFiles: ["/index.ts"],
  },
});
```

Autocomplete is now available for file paths.

---

## How it works

Generated code includes:

### Typed filename union

```ts
type FileNames = ...
```

### Typed Sandpack options

```ts
activeFile?: FileNames;
visibleFiles?: FileNames[];
```

### Runtime raw file loading

```ts
const modules = import.meta.glob("./example/*", {
  query: "?raw",
  import: "default",
});
```

### File object creation

```ts
{
  "/App.tsx": "...source...",
  "/index.ts": "...source...",
}
```

This object is injected directly into Sandpack.

---

## License

MIT
