import { Module } from '@nestjs/common';
import { LogoController } from '@src-api/modules/admin/logo/logo.controller';
import { LogoService } from '@src-api/modules/admin/logo/logo.service';

@Module({
  controllers: [LogoController],
  providers: [LogoService],
})
export class LogoModule {}
