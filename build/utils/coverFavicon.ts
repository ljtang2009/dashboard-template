// 系统设置中，如果修改了产品logo，当时是不会修改favicon文件本身
// 所以现在要把 src中的logo覆盖到public的favicon
import path from 'path';
import fs from 'fs-extra';

export default async () => {
  const logoPath = path.resolve(__dirname, '../../src/assets/logo.png');
  const faviconPath = path.resolve(__dirname, '../../public/logo.png');
  await fs.copy(logoPath, faviconPath);
};
