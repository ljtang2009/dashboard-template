import { request, requestOptions } from '@/utils/request';
import { moduleName as parentModuleName } from '@/api/admin/constant';

const moduleName = '/app-config';
function _getUrl(value: string): string {
  return `${parentModuleName}${moduleName}${value}`;
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
export function get(data?: object, options?: requestOptions) {
  return request({
    url: getUrl,
    method: 'get',
    data: data,
    options,
  });
}
