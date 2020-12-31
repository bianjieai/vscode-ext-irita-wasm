import * as shell from 'child_process';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { copyDir } from '../utils/copyDir';
import { replaceTemp } from '../utils/replaceTemp';

export async function generate(uri?: vscode.Uri) {
  let input = await vscode.window.showInputBox({
    ignoreFocusOut: true,
    placeHolder: "Please enter the contract name."
  });
  if (input === undefined) {
    vscode.window.showInformationMessage("Contract template generation cancelled.");
    return;
  } else if (input === "") {
    input = "irita";
  }

  var fileName: string;
  if (uri === undefined) {
    vscode.window.showErrorMessage("vscode.uri is undefined.");
    return;
  } else {
    fileName = uri.fsPath;
    if (!fs.statSync(fileName).isDirectory()) {
      fileName = path.join(fileName, "../");
    }

    try {
      shell.execSync("cd " + fileName + " && git clone https://github.com/CosmWasm/cosmwasm-template.git && mv cosmwasm-template " + input);
      replaceTemp("{{project-name}}", fileName + "/" + input, input);
      replaceTemp("{{crate_name}}", fileName + "/" + input, input);
    } catch (e) {
      vscode.window.showErrorMessage(`Generating error: ${e instanceof Error ? e.message : e}`);
      return;
    }

    vscode.window.showInformationMessage("Generating contract template completed");
  }
}