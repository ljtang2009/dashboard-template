import { request } from '@/utils/request';
import { moduleName as parentModuleName } from '@/api/admin/constant';

const moduleName = '/logo';
function getUrl(value: string): string {
  return `${parentModuleName}${moduleName}${value}`;
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
