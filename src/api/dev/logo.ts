import { request } from '@/utils/request';
import { devUrlPrefix as urlPrefix } from '@/api/common';

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
