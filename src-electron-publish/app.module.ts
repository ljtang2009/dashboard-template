import { Module } from '@nestjs/common';
import { StaticModule } from '@src-electron-publish/core/static.module';

@Module({
  imports: [StaticModule],
})
export class AppModule {}
