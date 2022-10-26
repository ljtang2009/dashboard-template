import { request } from '@/utils/request';
import { urlPrefix } from '@/api/constant';

const moduleName = '/user';
function _getUrl(value: string): string {
  return `${urlPrefix}${moduleName}${value}`;
}
const loginUrl = _getUrl('/login');

export function login(data: object) {
  return request({
    url: loginUrl,
    data,
  });
}
