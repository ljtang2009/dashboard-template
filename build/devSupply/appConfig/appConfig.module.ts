import { Module } from '@nestjs/common';
import { AppConfigController } from './appConfig.controller';
import { AppConfigService } from './appConfig.service';

@Module({
  controllers: [AppConfigController],
  providers: [AppConfigService],
})
export class AppConfigModule {}
