const { config } = require('dotenv');
const { resolve } = require('path');
const { pathExistsSync } = require('fs-extra');
const { app } = require('electron');
const envJSON = require('./env.json');

function initByJSON() {
  let envObj = {};
  for (const key in envJSON) {
    if (envJSON.hasOwnProperty(key)) {
      process.env[key] = envJSON[key];
      envObj[key] = envJSON[key];
    }
  }
  return envObj;
}

function initByENV() {
  let envObj = {};
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
      } else {
        envObj = { ...envObj, ...result.parsed };
      }
    }
  }
  return envObj;
}

function initEnv() {
  return app && app.isPackaged ? initByJSON() : initByENV();
}

exports.initEnv = initEnv;
