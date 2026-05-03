import { promises as fs } from "node:fs";

export async function getFileNames(dir: string) {
  const entries = await fs.readdir(dir, {
    withFileTypes: true,
  });

  return entries
    .filter((v) => v.isFile())
    .map((v) => v.name)
    .sort();
}
