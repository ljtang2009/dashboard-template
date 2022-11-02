import { compile } from '@src-utils/tsc-compile';
import { parseArgs } from '@src-utils/command';

const processArgs = parseArgs();

// 是否加密
const isEncrypt = !!processArgs['encrypt'];

(async () => {
  const distDirName = 'dist-api';
  const srcDirName = 'src-api'
  const assetDirList = ['./dist', './public-api', './public-api-build-in']
  await compile({
    distDirName,
    srcDirName,
    encrypt: isEncrypt,
    assetDirList,
  })
  console.log('构建完成');
})()
