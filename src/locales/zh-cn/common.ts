import LocaleUtil from './util';
import { ListInterpolation } from '@/utils/locale';

const localeUtil = new LocaleUtil();

export default {
  common: {
    save: '保存',
    close: '关闭',
    successfully: '成功',
    reset: '重置',
    system: '系统',
    config: '配置',
    name: '名称',
    logo: '商标',
    dragOrClickToUpload: '点击或者拖动文件到该区域来上传',
    fileFormatError: ({ list }: { list: ListInterpolation }) => {
      return `只能上传${localeUtil.joinOrList(list)}格式的图片文件，请重新上传`;
    },
    fileMaxSizeError: ({ named }: { named: (key: string) => string }) => {
      return `文件大小不能大于${named('maxSize')}，请重新上传`;
    },
  },
};
