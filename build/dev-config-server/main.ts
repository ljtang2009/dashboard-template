import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getPort from 'get-port';
import { devConfigServerPort } from '../config';
import { HttpLoggerMiddleware } from './core/http.logger.middleware';
import { ResponseWrapInterceptor } from './core/response.wrap.interceptor';
import { ExceptionInterceptor } from './core/exception.interceptor';
import { Logger } from './core/logger.service';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  // 每个路由都加上前缀
  app.setGlobalPrefix('dev');
  // 日志中间键，记录请求和响应
  app.use(new HttpLoggerMiddleware().use);
  // 封装response
  app.useGlobalInterceptors(new ResponseWrapInterceptor());
  // 异常拦截，传给response
  app.useGlobalInterceptors(new ExceptionInterceptor());
  const port = await getPort({
    port: devConfigServerPort,
  });
  await app.listen(port);
  return {
    port,
  };
}
