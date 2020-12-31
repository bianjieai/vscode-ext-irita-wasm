import * as sdk from '@irisnet/irishub-sdk';

export class KeyDAO implements sdk.KeyDAO {
  keyMap: { [key: string]: sdk.Key } = {};
  write(name: string, key: sdk.Key) {
    this.keyMap[name] = key;
  }
  read(name: string): sdk.Key {
    return this.keyMap[name];
  }
  delete(name: string) {
    delete this.keyMap[name];
  }
}