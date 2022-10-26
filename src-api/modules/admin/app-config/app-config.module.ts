import { Module } from '@nestjs/common';
import { AppConfigController } from '@src-api/modules/admin/app-config/app-config.controller';
import { AppConfigService } from '@src-api/modules/admin/app-config/app-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from '@src-api/modules/admin/app-config/app-config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppConfig])],
  controllers: [AppConfigController],
  providers: [AppConfigService],
})
export class AppConfigModule {}
