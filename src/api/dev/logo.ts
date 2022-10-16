import { request } from '@/utils/request';
import { urlPrefix } from '@/api/dev/config';

const moduleName = '/logo';
function getUrl(value: string): string {
  return `${urlPrefix}${moduleName}${value}`;
}
const resetUrl = getUrl('/reset');

/**
 * 重置
 * @returns
 */
export function reset() {
  return request({
    url: resetUrl,
  });
}
