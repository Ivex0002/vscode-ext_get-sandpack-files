import path from "node:path";

export class PathState {
  constructor(readonly targetDir: string) {
    if (!targetDir) {
      throw new Error("targetDir is required");
    }
  }

  get parentDir() {
    return path.dirname(this.targetDir);
  }

  get outputFile() {
    return path.join(this.parentDir, "files.for.sandpack.ts");
  }

  get baseName() {
    return path.basename(this.targetDir);
  }

  get globPath() {
    return `./${this.baseName}/*`;
  }
}
