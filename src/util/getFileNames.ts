import { promises as fs } from "node:fs";
import path from "node:path";

export async function getFileNames(dir: string) {
  const entries = await fs.readdir(dir, {
    withFileTypes: true,
  });

  const results: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isFile()) {
      results.push(entry.name);
      continue;
    }

    if (entry.isDirectory()) {
      const children = await getFileNames(fullPath);

      for (const child of children) {
        results.push(path.join(entry.name, child));
      }
    }
  }

  return results.sort();
}
