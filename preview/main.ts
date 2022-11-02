import { initEnv } from '@src-utils/env';
initEnv();
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@preview/app.module';
import getPort from 'get-port';
import { HttpLoggerMiddleware } from '@src-api/core/http.logger.middleware';
import { ExceptionInterceptor } from '@src-api/core/exception.interceptor';
import { Logger } from '@src-api/core/logger.service';
import path from 'path';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(path.resolve(__dirname)),
  });
  // 日志中间键，记录请求和响应
  app.use(new HttpLoggerMiddleware().use);
  // 异常拦截，传给response
  app.useGlobalInterceptors(new ExceptionInterceptor());
  const port = await getPort({
    port: parseInt(process.env['PREVIEW_PORT']!, 10),
  });
  await app.listen(port);
  return {
    port,
  };
}
