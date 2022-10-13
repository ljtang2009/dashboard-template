import { request } from '@/utils/request';

const urlPrefix = '/dev';
const saveUrl = urlPrefix + '/saveAppConfig';

export function save(data: object) {
  return request({
    url: saveUrl,
    data,
  });
}
