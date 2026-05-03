export const CODE = {
  TYPE: `type StrictOptions = Omit<
  SandpackProps["options"],
  "activeFile" | "visibleFiles"
> & {
  activeFile?: FileNames;
  visibleFiles?: FileNames[];
};

type StrictSandpackProps = Omit<SandpackProps, "options"> & {
  options?: StrictOptions;
};`,

  CREATE_SP_OPTIONS: `// create Sandpack options with auto complete
export async function createSandpackOptions(
  props?: StrictSandpackProps,
): Promise<SandpackProps> {
  const files = await getRawFiles();
  return {
    ...props,
    files: files,
  };
}`,

  GET_RAW_FILES: `async function getRawFiles() {
  const files = {} as Record<FileNames, string>;

  for (const [path, loader] of Object.entries(modules)) {
    const name = path.split("/").pop() as FileNames;

    files[name] = await loader();
  }

  return files;
}
`,
};
