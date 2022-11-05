import path from 'path'
import fs from 'fs-extra'
import asar from '@electron/asar'
import { parseArgs } from '@src-utils/command';

((async () => {
  const unpackedDirPath = path.resolve(process.cwd(), './unpacked-electron')
  const defaultAsarFilePath = path.resolve(process.cwd(), './dist-electron/windows/win-unpacked/resources/app.asar')
  const processArgs = parseArgs();
  // asar文件地址
  const asarPathArgs = processArgs['asar-path'];
  const asarPath = asarPathArgs ? asarPathArgs : defaultAsarFilePath

  console.log('清理unpacked目录');
  await fs.remove(unpackedDirPath);

  console.log('提取源文件');
  asar.extractAll(asarPath, unpackedDirPath)

  console.log(`unpack完成。文件存于 ${unpackedDirPath}`);
})())
