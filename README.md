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

<img width="1344" height="728" alt="Honeycam 2026-05-03 17-31-12" src="https://github.com/user-attachments/assets/055e906f-f23b-4e0f-a97a-5f9440dbd0b3" />

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

Your editor can then provide autocomplete and type checking.

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
export async function createSandpackOptions(props?) {
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

### 2. Run command

Open Command Palette:

```txt
Generate Sandpack Files
```

or use Explorer context menu.

### 3. Generated output

```txt
src/
├── example/
│   ├── App.tsx
│   ├── index.ts
│   └── styles.css
└── files.for.sandpack.ts
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

## Requirements

- Visual Studio Code
- Node.js
- CodeSandbox Sandpack
- build tool supporting `import.meta.glob` (such as Vite)

---

## License

MIT
