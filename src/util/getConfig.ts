import * as vscode from "vscode";

export type NamingStrategy = "base" | "parent" | "both";

export function getConfig() {
  const config = vscode.workspace.getConfiguration("getSandpackFiles");

  return {
    naming: config.get<NamingStrategy>("naming", "parent"),
  };
}
