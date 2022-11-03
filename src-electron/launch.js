require('bytenode');
const { app } = require('electron');
// 加载环境变量
const { initEnv } = require('../src-utils/env');
initEnv({ useProperties: app.isPackaged });

require('./main');
