import 'babel-polyfill';
import * as vscode from 'vscode';
import * as shell from 'child_process';
import { generate } from './src/commands/generateCmd';
import { compile } from './src/commands/compileCmd';
import { deploy } from './src/commands/deployCmd';

export function activate(context: vscode.ExtensionContext) {
  initialize();

  const generateCmd = vscode.commands.registerCommand('irita: Generate contract template', async (uri: vscode.Uri | undefined) =>
    generate(uri)
  );

  const compileCmd = vscode.commands.registerCommand('irita: Compile contract', async (uri: vscode.Uri | undefined) =>
    compile(uri)
  );

  const deployCmd = vscode.commands.registerCommand('irita: Deploy contract', async (uri: vscode.Uri | undefined) =>
    deploy(uri)
  );

  context.subscriptions.push(generateCmd);
  context.subscriptions.push(compileCmd);
  context.subscriptions.push(deployCmd);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function initialize() {
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
