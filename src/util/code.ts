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
  const entries = Object.entries(modules);

  const loaded = await Promise.all(
    entries.map(async ([path, loader]) => {
      const name = path.slice(ROOT.length) as FileNames;
      const code = await loader();

      return [name, code] as const;
    }),
  );

  return Object.fromEntries(loaded) as Record<FileNames, string>;
}
`,
};
