import { Injectable } from '@nestjs/common';
import { copy, createWriteStream } from 'fs-extra';
import { resolve } from 'path';

@Injectable()
export class LogoService {
  public logoPath = resolve(__dirname, '../../../src/assets/logo.png');

  public contentType = 'image/png';

  // const faviconPath = path.resolve(__dirname, '../../../public/logo.png'); // favicon 文件
  private logoDefaultPath = resolve(__dirname, '../../../src/assets/logo.default.png');

  public async saveByBuffer(buffer: Buffer) {
    // 如果改favicon，会造成页面刷新。（添加watch ignore无效）
    // 所以这里不改favicon, 重新build的时候，把src中的logo覆盖到public中
    // const functionList = [_save(req.file?.buffer, logoPath), _save(req.file?.buffer, faviconPath)];
    const functionList = [this.save(buffer, this.logoPath)];
    await Promise.all(functionList);
  }

  public reset() {
    return new Promise<void>((resolve, reject) => {
      copy(this.logoDefaultPath, this.logoPath, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  private async save(buffer: Buffer | undefined, filePath: string) {
    const ws = createWriteStream(filePath);
    return new Promise<void>((resolve, reject) => {
      ws.write(buffer, (error) => {
        ws.close();
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
