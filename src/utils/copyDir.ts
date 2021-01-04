import * as fs from 'fs';
import * as path from 'path';

export function copyDir(src: string, dst: string) {
  if (fs.existsSync(dst) === false) {
    fs.mkdirSync(dst);
  }
  var dirs = fs.readdirSync(src);
  dirs.forEach(function (item) {
    var itemPath = path.join(src, item);
    var temp = fs.statSync(itemPath);
    if (temp.isFile()) {
      fs.copyFileSync(itemPath, path.join(dst, item));
    } else if (temp.isDirectory()) {
      copyDir(itemPath, path.join(dst, item));
    }
  });
}