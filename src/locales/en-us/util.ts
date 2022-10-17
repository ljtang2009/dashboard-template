import { getStringByListInterpolation, ListInterpolation, LocaleUtil } from '@/utils/locale';

export default class implements LocaleUtil {
  public joinOrList: (list: ListInterpolation) => string = (list) => {
    return getStringByListInterpolation(list, ' or ', ',');
  };

  public joinAndList: (list: ListInterpolation) => string = (list) => {
    return getStringByListInterpolation(list, ' and ', ',');
  };
}
