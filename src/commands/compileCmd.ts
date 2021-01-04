import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as shell from 'child_process';
import { fileNameFromPath } from '../utils/fileSystem';

export async function compile(uri?: vscode.Uri) {
  var fileName: string;

  if (uri === undefined) {
    vscode.window.showErrorMessage("vscode.uri is undefined.");
    return;
  } else {
    fileName = uri.fsPath;
  }

  if (!fs.statSync(fileName).isDirectory()) {
    fileName = path.join(fileName, "../");
  }

  vscode.window.showInformationMessage(`Compiling ${fileNameFromPath(fileName)}...`);

  try {
    shell.execSync("cd " + fileName + " && RUSTFLAGS='-C link-arg=-s' cargo wasm");
  } catch (e) {
    vscode.window.showErrorMessage(`Compilation error: ${e instanceof Error ? e.message : e}`);
    return;
  }
  vscode.window.showInformationMessage(`Compilation completed!`);
}
