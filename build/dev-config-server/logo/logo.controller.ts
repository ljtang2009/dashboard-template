import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LogoService } from './logo.service';
import { Express, Response } from 'express';
import { createReadStream } from 'fs';
import { noWrapUrl } from '../core/response.wrap.interceptor';

const logoMaxSize = 2; // TODO 和前端同步配置
@Controller('logo')
export class LogoController {
  public constructor(private logoService: LogoService) {}

  @Get(noWrapUrl.getStream)
  protected async get(@Res({ passthrough: true }) res: Response) {
    const file = createReadStream(this.logoService.logoPath);
    res.set({
      'Content-Type': this.logoService.contentType,
    });
    return new StreamableFile(file);
  }

  @Post('save')
  @UseInterceptors(FileInterceptor('file'))
  protected async save(
    @Body() _body: {},
    @UploadedFile(
      // 文件检查
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: logoMaxSize * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'png' }), // TODO 和前端同步配置
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (file && file.buffer) {
      await this.logoService.saveByBuffer(file.buffer);
    } else {
      throw new Error('No buffer');
    }
  }

  @Post('reset')
  protected async reset() {
    await this.logoService.reset();
  }
}
