const { config } = require('dotenv');
const { resolve } = require('path');
const { pathExistsSync } = require('fs-extra');

function initEnv() {
  const envFileList = ['./.env.default', './.env.local'];
  for (const item of envFileList) {
    const filePath = resolve(process.cwd(), item);
    if (pathExistsSync(filePath)) {
      const result = config({
        path: filePath,
        override: true,
      });
      if (result.error) {
        throw result.error;
      }
    }
  }
}

exports.initEnv = initEnv;
