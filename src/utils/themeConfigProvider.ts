// 提供 theme， 不仅给全局化配置，还又独立API
import usePrimaryColorStore from '@/store/appConfig/primaryColor';
import { lighten } from '@/utils/color';

export function getThemeOverrides() {
  const primaryColorStore = usePrimaryColorStore();

  const primaryColor = primaryColorStore.primaryColor;
  const lightenColor = lighten(primaryColor, 6);
  return {
    common: {
      fontWeightStrong: '600',
      primaryColor: primaryColor,
      primaryColorHover: lightenColor,
      primaryColorPressed: lightenColor,
    },
    LoadingBar: {
      colorLoading: primaryColor,
    },
  };
}
