import { Module } from '@nestjs/common';
// import { RouterModule } from '@nestjs/core';
// import { AppConfigModule } from '@src-api/modules/admin/app-config/app-config.module';
// import { LogoModule } from '@src-api/modules/admin/logo/logo.module';

// const modulePrefix = 'admin';
// const moduleList = [AppConfigModule, LogoModule];
// const routerModule = RouterModule.register(
//   moduleList.map((item) => {
//     return { path: modulePrefix, module: item };
//   }),
// );

@Module({
  // imports: [...moduleList, routerModule],
  imports: [],
})
export class UserModule {}
