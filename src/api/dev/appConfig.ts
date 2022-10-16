import { request } from '@/utils/request';

const urlPrefix = '/dev';
const saveUrl = urlPrefix + '/saveAppConfig';
const readUrl = urlPrefix + '/readAppConfig';

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
