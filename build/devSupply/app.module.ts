import { Module } from '@nestjs/common';
import { AppConfigModule } from './appConfig/appConfig.module';
import { LogoModule } from './logo/logo.module';

@Module({
  imports: [AppConfigModule, LogoModule],
})
export class AppModule {}
