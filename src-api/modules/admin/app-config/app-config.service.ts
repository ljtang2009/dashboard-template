import { Injectable } from '@nestjs/common';
import { readJSON, writeJson } from 'fs-extra';
import { resolve } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysConfig } from '@src-api/modules/admin/app-config/app-config.entity';

@Injectable()
export class AppConfigService {
  private readonly appConfigPath: string = resolve(__dirname, '../../../src/config/appConfig.json');

  public constructor(
    @InjectRepository(SysConfig)
    private sysConfigRepository: Repository<SysConfig>,
  ) {}

  public read() {
    // return readJSON(this.appConfigPath);
    return this.sysConfigRepository.find();
  }

  public async save(newConfig: Record<string, any>) {
    const appConfig = await readJSON(this.appConfigPath);
    await writeJson(this.appConfigPath, { ...appConfig, ...newConfig }, { spaces: 2 });
  }
}
