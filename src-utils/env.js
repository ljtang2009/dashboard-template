const { config } = require('dotenv');
const path = require('path');
const { pathExistsSync } = require('fs-extra');
const envPropertiesFile = './env.properties';
const envProperties = require(envPropertiesFile);
const fs = require('fs-extra');

/**
 * @return {Recorder<string, string>}
 */
function initByProperties() {
  let envObj = {};
  for (const key in envProperties) {
    if (envProperties.hasOwnProperty(key)) {
      process.env[key] = envProperties[key];
      envObj[key] = envProperties[key];
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
    const filePath = path.resolve(process.cwd(), item);
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
 * @param { { useProperties: boolean } } [option]
 * @returns @return {Recorder<string, string>}
 */
exports.initEnv = function initEnv(option) {
  const func = option && option.useProperties ? initByProperties : initByENV;
  return func();
};

/**
 * 生成env.properties
 * @returns { PromiseLike<void> }
 */
exports.writeEnvProperties = async function writeEnvProperties() {
  const env = initByENV();
  await fs.outputFile(path.resolve(__dirname, envPropertiesFile + '.js'), `module.exports = ${JSON.stringify(env)}`);
};
