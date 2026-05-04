import * as vscode from "vscode";
import { generate } from "./generate";
import { PathState } from "./util/State";
import { getConfig } from "./util/getConfig";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "getSandpackFiles.generate",
    async (uri?: vscode.Uri) => {
      if (!uri) {
        vscode.window.showErrorMessage("No target directory selected");
        return;
      }

      try {
        const config = getConfig();
        const pathState = new PathState(uri.fsPath, config.naming);

        const { fileNames, baseName } = await generate(pathState);

        vscode.window.showInformationMessage(
          `${fileNames.length} files generated in [${baseName}]`,
        );

        const document = await vscode.workspace.openTextDocument(
          pathState.outputFile,
        );
        await vscode.window.showTextDocument(document);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        vscode.window.showErrorMessage(
          `Failed to generate Sandpack files: ${errorMessage}`,
        );
      }
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
