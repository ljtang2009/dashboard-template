import { request } from '@/utils/request';
import { urlPrefix } from '@/api/dev/config';

const moduleName = '/appConfig';
function getUrl(value: string): string {
  return `${urlPrefix}${moduleName}${value}`;
}
const saveUrl = getUrl('/save');
const readUrl = getUrl('/read');

/**
 * 保存配置
 * @param data
 * @returns
 */
export function save(data: object) {
  return request({
    url: saveUrl,
    data,
  });
}

/**
 * 读取配置
 * @returns
 */
export function read() {
  return request({
    url: readUrl,
    method: 'get',
  });
}
