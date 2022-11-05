const { parseArgs } = require('./command');
const fs = require('fs-extra');
const path = require('path');
const { DataSource } = require('typeorm');
const sqlcipher = require('@journeyapps/sqlcipher');

const processArgs = parseArgs();

/**
 * 检查参数
 * @param { Object } option
 * @param { string } option.srcDBFilePath
 * @param { string } option.key
 * @param { string } [option.distDBFilePath]
 */
async function checkParams(option) {
  let errorMessage;
  if (
    !errorMessage &&
    (!option.srcDBFilePath || typeof option.srcDBFilePath !== 'string' || option.srcDBFilePath.length === 0)
  ) {
    errorMessage = 'srcDBFilePath 必须是字符串!';
  }
  if (!errorMessage) {
    const isExists = await fs.pathExists(option.srcDBFilePath);
    if (!isExists) {
      errorMessage = 'srcDBFilePath 路径不存在!';
    } else {
      const stat = await fs.stat(option.srcDBFilePath);
      if (!stat.isFile()) {
        errorMessage = 'srcDBFilePath 必须是文件路径!';
      }
    }
  }
  if (!errorMessage && (!option.key || typeof option.key !== 'string' || option.key.length === 0)) {
    errorMessage = 'key 必须是字符串!';
  }
  if (!errorMessage) {
    if (option.distDBFilePath && typeof option.distDBFilePath === 'string') {
      const isExists = await fs.pathExists(option.distDBFilePath);
      if (isExists) {
        errorMessage = 'distDBFilePath 路径已被占用!';
      }
    }
  }
  return errorMessage;
}

/**
 * 生成目标文件路径
 * @param { string } srcDBFilePath
 */
async function generateDistDBFilePath(srcDBFilePath) {
  const srcDBFileFullName = path.basename(srcDBFilePath);
  const srcDBFileParentPath = path.dirname(srcDBFilePath);
  const srcDBFileExtension = path.extname(srcDBFilePath);
  const srcDBFileName = srcDBFileFullName.substring(0, srcDBFileFullName.length - srcDBFileExtension.length);
  let index = 0;
  let distDBFilePath;
  while (true) {
    const distDBFileFullName = `${srcDBFileName}_decrypt${index > 0 ? `_${index}` : ''}${srcDBFileExtension}`;
    distDBFilePath = path.resolve(srcDBFileParentPath, `./${distDBFileFullName}`);
    const isExists = await fs.pathExists(distDBFilePath);
    if (!isExists) {
      break;
    }
    index++;
  }
  return distDBFilePath;
}

/**
 * 解密
 * @param { Object } option
 * @param { string } option.srcDBFilePath
 * @param { string } option.key
 * @param { string } option.distDBFilePath
 */
async function decrypt(option) {
  console.log(option);
  const dataSource = new DataSource({
    type: 'sqlite',
    database: option.srcDBFilePath,
    driver: sqlcipher,
    logging: true,
    logger: 'advanced-console',
  });
  await dataSource.initialize();
  await dataSource.query('PRAGMA cipher_compatibility = 4');
  await dataSource.query(`PRAGMA key = '${option.key}'`);
  await dataSource.query(`ATTACH DATABASE '${option.distDBFilePath}' AS plaintext KEY ''`);
  await dataSource.query("SELECT sqlcipher_export('plaintext')");
  dataSource.destroy();
}

(async () => {
  const srcDBFilePath = processArgs['srcDBFilePath'];
  const key = processArgs['key'];
  let distDBFilePath = processArgs['distDBFilePath'];

  const errorMessage = await checkParams({
    srcDBFilePath,
    key,
    distDBFilePath,
  });
  if (errorMessage) {
    console.error(errorMessage);
    return;
  }

  if (!distDBFilePath) {
    distDBFilePath = await generateDistDBFilePath(srcDBFilePath);
  }

  await decrypt({
    srcDBFilePath,
    key,
    distDBFilePath,
  });

  console.log(`解密完成. 新数据库文件: ${distDBFilePath}`);
})();
