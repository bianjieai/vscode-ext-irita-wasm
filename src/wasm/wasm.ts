import * as shell from 'child_process';
import * as vscode from 'vscode';

export function wasmInit() {
  var data = shell.execSync("rustup target list --installed | grep wasm32");

  if (data.length === 0) {
    try {
      shell.execSync("rustup target add wasm32");
    } catch (e) {
      vscode.window.showErrorMessage(`error: ${e instanceof Error ? e.message : e}`);
      return;
    }
  }
}
 