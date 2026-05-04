import { getFileNames } from "./util/getFileNames";
import { makeSource } from "./util/makeSource";
import { PathState } from "./util/State";
import { promises as fs } from "node:fs";

export async function generate(pathState: PathState) {
  const { baseName, outputFile, globPath, targetDir, dirName } = pathState;

  const fileNames = await getFileNames(targetDir);

  const source = makeSource(fileNames, globPath, dirName);

  await fs.writeFile(outputFile, source, "utf8");

  return { fileNames, baseName };
}
