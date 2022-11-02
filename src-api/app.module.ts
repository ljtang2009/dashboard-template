import { Module } from '@nestjs/common';
import { StaticModule } from '@src-api/core/static.module';
import { DataSourceModule } from '@src-api/core/data-source.module';
import { AdminModule } from '@src-api/modules/admin/admin.module';
import { UserModule } from '@src-api/modules/user/user.model';

@Module({
  imports: [
    StaticModule,
    DataSourceModule,
    AdminModule,
    UserModule],
})
export class AppModule { }
