import { compile } from '@src-utils/tsc-compile';
import { parseArgs } from '@src-utils/command';

const processArgs = parseArgs();

// 是否加密
const isEncrypt = !!processArgs['encrypt'];

(async () => {
  const distDirName = 'dist-electron-publish';
  const srcDirName = 'src-electron-publish'
  const assetDirList = ['./dist-electron']
  await compile({
    distDirName,
    srcDirName,
    encrypt: isEncrypt,
    assetDirList,
    haveLaunch: true,
    bytenodeCompileFilter: (distFile) => {
      return !distFile.endsWith('launch.js')
    }
  })
  console.log('构建完成');
})()