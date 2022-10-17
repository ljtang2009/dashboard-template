import LocaleUtil from './util';
import { ListInterpolation } from '@/utils/locale';

const localeUtil = new LocaleUtil();

export default {
  common: {
    save: '保存',
    close: '關閉',
    successfully: '成功',
    reset: '重置',
    system: '系統',
    config: '配置',
    name: '名稱',
    logo: '商標',
    dragOrClickToUpload: '點擊或者拖動文件到該區域來上傳',
    fileFormatError: ({ list }: { list: ListInterpolation }) => {
      return `只能上傳${localeUtil.joinOrList(list)}格式的圖片文件，請重新上傳`;
    },
    fileMaxSizeError: ({ named }: { named: (key: string) => string }) => {
      return `文件大小不能大於${named('maxSize')}，請重新上傳`;
    },
  },
};
