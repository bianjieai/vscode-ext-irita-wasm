import * as fs from 'fs';
import * as path from 'path';

export function replaceTemp(old: string, url: string, target: string) {
  let reg = new RegExp(old, 'g');
  let files = fs.readdirSync(url);
  if ( url.indexOf(".git") !== -1 ){
    return;
  }
  files.forEach(function (file: any, index: any) {
    const curUrl = path.join(url, file);
    if (fs.statSync(curUrl).isDirectory()) {
      replaceTemp(old, curUrl, target);
    } else {
      let data = fs.readFileSync(curUrl);
      var dataBuffer = data.toString().replace(reg, target);
      fs.writeFileSync(curUrl, dataBuffer);
    }
  });
}
