import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

export const StaticModule = ServeStaticModule.forRoot({
  rootPath: resolve(process.cwd(), './dist'),
});
