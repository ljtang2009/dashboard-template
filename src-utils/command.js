/**
 * 解析命令参数
 * @param { Array<string> } [args]
 * @return { Recorder<string, string | boolean>}
 */
exports.parseArgs = function (args) {
  const _args = args ? args : process.argv.slice(2);
  const parsedArgs = {};

  _args.forEach((arg) => {
    const parts = arg.split('=');
    parsedArgs[parts[0]] = parts.length > 1 ? parts[1] : true;
  });

  return parsedArgs;
};
