import * as vscode from 'vscode';
import { KeyDAO } from '../key/keyDAO';
import * as config from '../config/config';
import * as sdk from '@irisnet/irishub-sdk';

export var client:sdk.Client;

function createClient(node:any, chainId:any , gas:any, mnemonic:any, algorithm:any): sdk.Client {
  const client = sdk
    .newClient({
      node: node,
      network: sdk.Network.Mainnet,
      chainId: chainId,
      gas: gas,
    })
    .withKeyDAO(new KeyDAO())
    .withRpcConfig({ timeout: config.timeout });

  client.keys.recover(config.keyName, config.password, mnemonic, algorithm);
  return client;
}

export function clientInit() {
  let extConfig = vscode.workspace.getConfiguration();
  client = createClient(extConfig.get("vscode-ext-irita-wasm.rpcAddress"), extConfig.get("vscode-ext-irita-wasm.chainID"), extConfig.get("vscode-ext-irita-wasm.gasLimit"), extConfig.get("vscode-ext-irita-wasm.mnemonic"), extConfig.get("vscode-ext-irita-wasm.algorithm"));
}
