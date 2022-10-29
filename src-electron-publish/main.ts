import { initEnv } from '@build/utils/env';
initEnv();
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src-electron-publish/app.module';
import getPort from 'get-port';
import { HttpLoggerMiddleware } from '@src-api/core/http.logger.middleware';
import { ExceptionInterceptor } from '@src-api/core/exception.interceptor';
import { Logger } from '@src-api/core/logger.service';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger('./src-electron-publish'),
  });
  // 日志中间键，记录请求和响应
  app.use(new HttpLoggerMiddleware().use);
  // 异常拦截，传给response
  app.useGlobalInterceptors(new ExceptionInterceptor());
  const port = await getPort({
    port: 8084,
  });
  await app.listen(port);
  return {
    port,
  };
}
