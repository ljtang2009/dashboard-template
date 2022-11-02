import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { StaticModule } from '@preview/core/static.module';
import { ApiProxyMiddleware } from '@preview/core/api-proxy.middleware'

@Module({
  imports: [StaticModule],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiProxyMiddleware)
      .forRoutes('api');
  }
}
