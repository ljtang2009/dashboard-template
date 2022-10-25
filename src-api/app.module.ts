import { Module } from '@nestjs/common';
import { AdminModule } from '@src-api/modules/admin/admin.module';
import { DataSourceModule } from '@src-api/core/data-source.module';

@Module({
  imports: [DataSourceModule, AdminModule],
})
export class AppModule {}
