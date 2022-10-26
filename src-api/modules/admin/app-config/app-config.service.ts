import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppConfig } from '@src-api/modules/admin/app-config/app-config.entity';

@Injectable()
export class AppConfigService {
  public constructor(
    @InjectRepository(AppConfig)
    private appConfigRepository: Repository<AppConfig>,
  ) {}

  public async get() {
    const appConfigArray = await this.appConfigRepository.find();
    const result: Record<string, string> = {};
    for (const item of appConfigArray) {
      result[item.configKey] = item.configValue;
    }
    return result;
  }

  public async save(newConfig: Record<string, any>) {
    const findOriginalDataFunctionArray = [];
    for (const key in newConfig) {
      if (newConfig.hasOwnProperty(key)) {
        findOriginalDataFunctionArray.push(
          (() => {
            return new Promise((resolve, reject) => {
              this.appConfigRepository
                .findOneBy({
                  configKey: key,
                })
                .then((row) => {
                  resolve({ ...row, configKey: key, configValue: newConfig[key] });
                })
                .catch((err) => reject(err));
            });
          })(),
        );
      }
    }
    const newRows = await Promise.all(findOriginalDataFunctionArray);
    await this.appConfigRepository.save(newRows as Array<AppConfig>);
  }
}
