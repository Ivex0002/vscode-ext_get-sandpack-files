export const CODE = {
  TYPE: `type StrictOptions = Omit<
  NonNullable<SandpackProps["options"]>,
  "activeFile" | "visibleFiles"
> & {
  activeFile?: FileNames;
  visibleFiles?: FileNames[];
};

type StrictSandpackProps = Omit<SandpackProps, "options"> & {
  options?: StrictOptions;
};`,

  CREATE_SP_OPTIONS: (
    dirName: string,
  ) => `// create Sandpack options with auto complete
export const SPOptions_${dirName} = {
  create : createSandpackOptions
}

async function createSandpackOptions(
  props?: StrictSandpackProps,
): Promise<SandpackProps> {
  const files = await getRawFiles();
  return {
    ...props,
    files: files,
  };
}`,

  GET_RAW_FILES: (baseName: string) => `async function getRawFiles() {
  const ROOT = "./${baseName}";
  const files = {} as Record<FileNames, string>;

  for (const [path, loader] of Object.entries(modules)) {
    const name = path.slice(ROOT.length) as FileNames;

    files[name] = await loader();
  }

  return files;
}
`,
};
