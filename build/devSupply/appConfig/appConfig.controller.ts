import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppConfigService } from './appConfig.service';
import { Request } from 'express';

@Controller('appConfig')
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
