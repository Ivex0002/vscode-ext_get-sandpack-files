import { CODE } from "./code";

const { CREATE_SP_OPTIONS, GET_RAW_FILES, TYPE } = CODE;

export function makeSource(
  fileNames: string[],
  globPath: string,
  dirName: string,
  baseName: string,
) {
  return `import { type SandpackProps } from "@codesandbox/sandpack-react";

type FileNames = ${makeUnion(fileNames)};

${TYPE}

${CREATE_SP_OPTIONS(dirName)}

// raw files for runtime
const modules = import.meta.glob<string>(${JSON.stringify(globPath)}, {
  query: "?raw",
  import: "default",
});

${GET_RAW_FILES(baseName)}
`;
}

function makeUnion(fileNames: string[]) {
  return fileNames.length === 0
    ? `never`
    : fileNames.map((v) => `"/${v}"`).join(" | ");
}
