import { compile } from '@src-utils/tsc-compile';
import { parseArgs } from '@src-utils/command';
import { outputFile } from '@src-utils/system-info'
import path from 'path'

const processArgs = parseArgs();

// 是否加密
const isEncrypt = !!processArgs['encrypt'];

(async () => {
  const distDirName = 'dist-electron-publish';
  const srcDirName = 'src-electron-publish'
  const assetDirList = ['./dist-electron']
  const result = await compile({
    distDirName,
    srcDirName,
    encrypt: isEncrypt,
    assetDirList,
    haveLaunch: true,
    bytenodeCompileFilter: (distFile) => {
      return !distFile.endsWith('launch.js')
    }
  })

  console.log('生成系统信息')
  await outputFile({ outputPath: path.resolve(result.distDirPath, './system-info.json') })

  console.log(`构建完成。文件存于 ${result.distDirPath}`);
})()
