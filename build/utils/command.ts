/**
 * 解析命令参数
 * @param args
 */
export function parseArgs(args?: string[]) {
  const _args = args ? args : process.argv.slice(2);
  const parsedArgs: Record<string, string | boolean> = {};

  _args.forEach((arg) => {
    const parts = arg.split('=');
    parsedArgs[parts[0]] = parts.length > 1 ? parts[1] : true;
  });

  return parsedArgs;
}
