import path from "node:path";
import { NamingStrategy } from "./getConfig";

export class PathState {
  constructor(
    readonly targetDir: string,
    readonly naming: NamingStrategy,
  ) {
    if (!targetDir) {
      throw new Error("targetDir is required");
    }
  }

  get parentPath() {
    return path.dirname(this.targetDir);
  }

  get outputFile() {
    return path.join(this.parentPath, "files.for.sandpack.ts");
  }

  get parentName() {
    return path.basename(this.parentPath);
  }

  get baseName() {
    return path.basename(this.targetDir);
  }

  get globPath() {
    return `./${this.baseName}/**/*`;
  }

  // exported obj name
  get dirName() {
    const rawMap = {
      parent: () => this.parentName,
      base: () => this.baseName,
      both: () => `${this.parentName}-${this.baseName}`,
    } satisfies Record<NamingStrategy, () => string>;

    return toIdentifier(rawMap[this.naming]());
  }
}

function toIdentifier(str: string) {
  return str
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((v) => v[0].toUpperCase() + v.slice(1))
    .join("");
}
