import { promises as fs } from "node:fs";
import path from "node:path";

export async function getFileNames(dir: string) {
  const results = await abc(dir);

  return results.sort();
}

async function abc(dir: string) {
  const results: string[] = [];
  const entries = await fs.readdir(dir, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.name.startsWith(".")) {
      continue;
    }

    if (entry.isFile()) {
      results.push(entry.name);
      continue;
    }

    if (entry.isDirectory()) {
      const children = await getFileNames(fullPath);

      for (const child of children) {
        results.push(`${entry.name}/${child}`);
      }
    }
  }

  return results;
}
