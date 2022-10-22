import { request } from '@/utils/request';
import { urlPrefix } from '@/api/dev/config';

const moduleName = '/appConfig';
function _getUrl(value: string): string {
  return `${urlPrefix}${moduleName}${value}`;
}
const saveUrl = _getUrl('/save');
const getUrl = _getUrl('/get');

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
export function get() {
  return request({
    url: getUrl,
    method: 'get',
  });
}
