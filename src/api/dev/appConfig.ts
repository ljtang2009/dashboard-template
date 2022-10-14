import { request } from '@/utils/request';

const urlPrefix = '/dev';
const saveUrl = urlPrefix + '/saveAppConfig';
const readUrl = urlPrefix + '/readAppConfig';

export function save(data: object) {
  return request({
    url: saveUrl,
    data,
  });
}

export function read() {
  return request({
    url: readUrl,
    method: 'get',
  });
}
