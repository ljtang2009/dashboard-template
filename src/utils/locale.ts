export declare type ListInterpolation = (index: number) => string | undefined;

/**
 * 根据list 获取array
 * @param list
 */
function getArrayByListInterpolation(list: ListInterpolation) {
  const result: Array<string> = [];
  let index = 0;
  while (true) {
    const str = list(index);
    if (str === undefined) {
      break;
    } else {
      result.push(str);
      index++;
    }
  }
  return result;
}

/**
 * 根据list 获取array
 * @param list
 * @param conj 连词
 * @param comma 逗号
 */
export function getStringByListInterpolation(list: ListInterpolation, conj: string, comma: string) {
  let result = '';
  const arr = getArrayByListInterpolation(list);
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
    if (arr.length > 1) {
      // 如果是倒数第二个
      if (i === arr.length - 2) {
        result += conj;
      } else if (i < arr.length - 2) {
        result += comma;
      }
    }
  }
  return result;
}

export interface LocaleUtil {
  /**
   * 或连接数组
   */
  joinOrList: (list: ListInterpolation) => string;
  /**
   * 与连接数组
   */
  joinAndList: (list: ListInterpolation) => string;
}
