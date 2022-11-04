# dashboard-template

dashboard 应用模板。

## 启动前端 dev 服务

`npm run build:dev`

该命令会自动启动 api 服务。前端代码热更新，api 代码**不支持**热更新。

配置前端 dev 服务端口参考: [环境变量](#DEV_SERVER_PORT)

### 启动纯前端 dev 服务

`npm run build:dev manual-api-server`

该命令**不会**自动启动 api 服务，需要手动启动。

### mock api-server

`npm run build:dev mock-api-server`

该命令会把前端需要的 api 服务代理到 mock 服务上。

配置 mock 服务地址参考：[环境变量](#MOCK_SERVER_URL)

## 打包前端代码

`npm run build:prod`

打包后代码存于`dist`目录下。

## 预览打包后的前端代码

`npm run preview`

该命令自动代理 api 到 mock 服务。如果要预览服务连到本地 api 服务，则只需[启动 api 服务](#start:api)。

配置 mock 服务地址参考：[环境变量](#MOCK_SERVER_URL)

## <span id="start:api">启动 api 服务</span>

`npm run start:api`

配置 api 服务端口参考：[环境变量](#API_SERVER_PORT)

## 编译 api 服务代码

`npm run build:api`

编译目的[参考](#t2j)。

### 加密编译 api 服务代码

`npm run build:api encrypt`

加密目的[参考](#encrypt)。

## 运行 electron

`npm run start:electron`

## 编译打包 electron

`npm run build:electron`

打包后的文件存于`dist-api`中。

### 加密编译打包 electron

`npm run build:electron encrypt`

## 反编译 asar

`npm run unpack:electron`

反编译后的文件存于`unpacked-electron`中。

## 启动 electron publish 服务

`npm run start:electron-publish`

配置 electron publish 服务端口参考：[环境变量](#ELECTRON_UPDATE_SERVER_PORT)

## 编译 electron publish 服务代码

`npm run build:electron-publish`

编译目的[参考](#t2j)。

### 加密编译 electron publish 服务代码

`npm run build:electron-publish encrypt`

加密目的[参考](#encrypt)。

## 环境变量

所有环境变量都存于 [.env.default](./.env.default) 和 [.env.local](./.env.local) 中, 后者会覆盖前者。

### 变量列表

| 键                                                                        | 说明                      | 示例                                           |
| ------------------------------------------------------------------------- | ------------------------- | ---------------------------------------------- |
| <span id="DEV_SERVER_PORT">DEV_SERVER_PORT</span>                         | 前端 dev 服务端口         | 8099                                           |
| ANALYZER_PORT                                                             | 前端 webpack 分析服务端口 | 8098                                           |
| <span id="PREVIEW_PORT">PREVIEW_PORT</span>                               | 前端编译后预览端口        | 8097                                           |
| <span id="MOCK_SERVER_URL">MOCK_SERVER_URL</span>                         | mock 服务地址             | `"http://127.0.0.1:4523/m1/1773693-0-default"` |
| <span id="API_SERVER_PORT">API_SERVER_PORT</span>                         | API 服务端口              | 8096                                           |
| <span id="ELECTRON_UPDATE_SERVER_PORT">ELECTRON_UPDATE_SERVER_PORT</span> | electron 升级服务端口     | 8084                                           |
| DB_FILE_Path                                                              | 数据库文件路径            | `"./db/main.db"`                               |

## <span id="t2j">编译 typescript to javascript 目的</span>

程序由 typescript 代码编写，如果需要在 node 原生环境中运行，则需要打包。

打包后的文件存于 ~~src~~dist-xxx-xxx 中。

若要启动编译后的 javascript 代码程序，则执行 `node dist-xxx-xxx/launch.js` 。

## <span id="encrypt">加密代码目的</span>

对于有安全要求的环境（例如公共服务器，或 electron），加密保护代码安全。

加密后可能会导致文件变大，运行速度降低。
