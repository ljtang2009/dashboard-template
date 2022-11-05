const si = require('systeminformation');
const fs = require('fs-extra');

/**
 * 系统变量输出到文件
 * @param { Object } option
 * @param { string } option.outputPath
 * @param { Object } [option.infoStructure={ cpu: '*', osInfo: 'platform, release', versions: '*'}]
 */
exports.outputFile = async function (option) {
  const infoStructure = option.infoStructure
    ? option.infoStructure
    : {
        cpu: '*',
        osInfo: 'platform, release',
        versions: '*',
      };
  const data = await si.get(infoStructure);
  await fs.outputJSON(option.outputPath, data);
};
