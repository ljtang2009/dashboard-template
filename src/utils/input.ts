/**
 * 根据 input 的 accept 获取文件类型
 * @param acceptTypes 例如 ['image/png', '.jpeg']
 */
export function getFileTypeListByAcceptTypes(acceptTypes: Array<string>): Array<string> {
  const result: Array<string> = [];
  for (const acceptType of acceptTypes) {
    let fileType;
    if (acceptType.indexOf('/') > -1) {
      const tempArray = acceptType.split('/');
      fileType = tempArray[tempArray.length - 1].trim();
    } else if (acceptType.indexOf('.') > -1) {
      const tempArray = acceptType.split('.');
      fileType = tempArray[tempArray.length - 1].trim();
    }
    if (fileType && fileType.length > 0) {
      result.push(fileType);
    }
  }
  return result;
}
