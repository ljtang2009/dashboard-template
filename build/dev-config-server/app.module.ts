import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { LogoModule } from './logo/logo.module';

@Module({
  imports: [AppConfigModule, LogoModule],
})
export class AppModule {}
