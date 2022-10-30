import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import type { Response } from 'express';

export const StaticModule = ServeStaticModule.forRoot({
  rootPath: resolve(process.cwd(), './dist-electron'),
  serveStaticOptions: {
    setHeaders: (res: Response, _path: string, _stat: any) => {
      res.set({
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7TMYhSONfkAM2z3a',
      });
    }
  }
});
