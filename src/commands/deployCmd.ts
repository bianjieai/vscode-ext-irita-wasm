import * as vscode from 'vscode';
import * as fs from 'fs';
import * as config from '../config/config';
import { client } from '../client/client';
import * as zopfli from 'node-zopfli';
import * as sdk from '@irisnet/irishub-sdk';

class BaseTx implements sdk.BaseTx {
  from = config.keyName;
  password = config.password;
  mode = sdk.BroadcastMode.Commit;
  fee = { amount: config.fee, denom: "" };
  pubkeyType = "";
  constructor(denom:any, algorithm:any) {
    this.fee.denom = denom;
    this.pubkeyType = algorithm;
  }
};

export async function deploy(uri?: vscode.Uri) {
  var fileName: string;
  if (uri === undefined) {
    const editor = vscode.window.activeTextEditor;

    if (editor === undefined) {
      vscode.window.showErrorMessage('Open smart contract file first.');
      return;
    }

    fileName = editor.document.fileName;
    if (!fileName.endsWith('.wasm')) {
      vscode.window.showErrorMessage('Only wasm smart contracts are supported.');
      return;
    }
  } else {
    fileName = uri.fsPath;
  }
  
  var wasmCode = fs.readFileSync(fileName);
  var data = zopfli.gzipSync(Buffer.from(wasmCode), {
    verbose: false,
    verbose_more: false,
    numiterations: 15,
    blocksplitting: true,
    blocksplittinglast: false,
    blocksplittingmax: 15
  });
  var extConfig = vscode.workspace.getConfiguration();
  try {
    // Fee and gas will be adjusted dynamically in the future.
    var res:any = await client
      .contract.storeCode(
        data,
        {},
        new BaseTx(extConfig.get("vscode-ext-irita-wasm.denom"), extConfig.get("vscode-ext-irita-wasm.algorithm"))
      );
    vscode.window.showInformationMessage(JSON.stringify(res));
    console.log(res);
  } catch(e) {
    console.log(e);
    vscode.window.showErrorMessage(e.toString());
  }
}