import LocaleUtil from './util';
import { ListInterpolation } from '@/utils/locale';

const localeUtil = new LocaleUtil();

export default {
  common: {
    save: 'save',
    close: 'close',
    successfully: 'successfully',
    reset: 'reset',
    system: 'system',
    config: 'config',
    name: 'name',
    logo: 'logo',
    dragOrClickToUpload: 'Click or drag files to this area to upload.',
    customizable: 'customizable',
    fileFormatError: ({ list }: { list: ListInterpolation }) => {
      return `You can only upload files in ${localeUtil.joinOrList(list)} format, please upload again.`;
    },
    fileMaxSizeError: ({ named }: { named: (key: string) => string }) => {
      return `File size cannot be larger than ${named('maxSize')}, please upload again.`;
    },
  },
};
