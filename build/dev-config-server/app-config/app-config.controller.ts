import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { Request } from 'express';

@Controller('app-config')
export class AppConfigController {
  public constructor(private appConfigService: AppConfigService) {}

  @Get('get')
  protected async get() {
    return await this.appConfigService.read();
  }

  @Post('save')
  protected async save(@Req() request: Request) {
    return await this.appConfigService.save(request.body);
  }
}
