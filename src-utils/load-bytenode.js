require('bytenode');
const { parseArgs } = require('./command');
const processArgs = parseArgs();
const fs = require('fs-extra');

/**
 * 检查参数
 * @param { Object } option
 * @param { string } option.bytenodeFilePath
 */
async function checkParams(option) {
  let errorMessage;
  if (
    !errorMessage &&
    (!option.bytenodeFilePath || typeof option.bytenodeFilePath !== 'string' || option.bytenodeFilePath.length === 0)
  ) {
    errorMessage = 'bytenodeFilePath 必须是字符串!';
  }
  if (!errorMessage) {
    const isExists = await fs.pathExists(option.bytenodeFilePath);
    if (!isExists) {
      errorMessage = 'bytenodeFilePath 路径不存在!';
    } else {
      const stat = await fs.stat(option.bytenodeFilePath);
      if (!stat.isFile()) {
        errorMessage = 'bytenodeFilePath 必须是文件路径!';
      }
    }
  }
  return errorMessage;
}

(async () => {
  const bytenodeFilePath = processArgs['bytenodeFilePath'];
  const errorMessage = await checkParams({
    bytenodeFilePath,
  });
  if (errorMessage) {
    console.error(errorMessage);
    return;
  }
  const m = require(bytenodeFilePath);
  console.log(m);
})();
