import { Injectable } from '@nestjs/common';
import { readJSON, writeJson } from 'fs-extra';
import { resolve } from 'path';

@Injectable()
export class AppConfigService {
  private readonly appConfigPath: string = resolve(__dirname, '../../../src/config/appConfig.json');

  public read() {
    return readJSON(this.appConfigPath);
  }

  public async save(newConfig: Record<string, any>) {
    const appConfig = await readJSON(this.appConfigPath);
    await writeJson(this.appConfigPath, { ...appConfig, ...newConfig }, { spaces: 2 });
  }
}
