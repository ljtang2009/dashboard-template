const { config } = require('dotenv');
const { resolve } = require('path');
const { pathExistsSync } = require('fs-extra');
const envJSON = require('./env.properties.json');

/**
 * @return {Recorder<string, string>}
 */
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

/**
 * @return {Recorder<string, string>}
 */
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

/**
 * 初始化环境变量
 * @param { { json: boolean } } [option]
 * @returns @return {Recorder<string, string>}
 */
function initEnv(option) {
  const func = option && option.json ? initByJSON : initByENV;
  return func();
}

exports.initEnv = initEnv;
