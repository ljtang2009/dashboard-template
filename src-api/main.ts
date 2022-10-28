import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src-api/app.module';
import getPort from 'get-port';
import { apiServerPort } from '@src-api/config';
import { HttpLoggerMiddleware } from '@src-api/core/http.logger.middleware';
import { ResponseWrapInterceptor } from '@src-api/core/response.wrap.interceptor';
import { ExceptionInterceptor } from '@src-api/core/exception.interceptor';
import { Logger } from '@src-api/core/logger.service';
import initDB from '@src-api/core/database.init';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  // 每个路由都加上前缀
  app.setGlobalPrefix('api');
  // 日志中间键，记录请求和响应
  app.use(new HttpLoggerMiddleware().use);
  // 封装response
  app.useGlobalInterceptors(new ResponseWrapInterceptor());
  // 异常拦截，传给response
  app.useGlobalInterceptors(new ExceptionInterceptor());
  const port = await getPort({
    port: apiServerPort,
  });
  await app.listen(port);
  // 初始化数据库
  await initDB();
  return {
    port,
  };
}
