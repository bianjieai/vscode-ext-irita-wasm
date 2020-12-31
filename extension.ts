import 'babel-polyfill';
import * as vscode from 'vscode';
import { generate } from './src/commands/generateCmd';
import { compile } from './src/commands/compileCmd';
import { deploy } from './src/commands/deployCmd';
import { clientInit } from './src/client/client';
import { wasmInit } from './src/wasm/wasm';

export function activate(context: vscode.ExtensionContext) {
  initialize();

  const generateCmd = vscode.commands.registerCommand('vscode-ext-irita-wasm.generate', async (uri: vscode.Uri | undefined) =>
    generate(uri)
  );

  const compileCmd = vscode.commands.registerCommand('vscode-ext-irita-wasm.compile', async (uri: vscode.Uri | undefined) =>
    compile(uri)
  );

  const deployCmd = vscode.commands.registerCommand('vscode-ext-irita-wasm.deploy', async (uri: vscode.Uri | undefined) =>
    deploy(uri)
  );

  context.subscriptions.push(generateCmd);
  context.subscriptions.push(compileCmd);
  context.subscriptions.push(deployCmd);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function initialize() {
  try {
    clientInit();
  } catch(e) {
    vscode.window.showInformationMessage(e.toString());
    console.log("Client init error: ", e);
  }
  wasmInit();
}
