// 提供 theme， 不仅给全局化配置，还又独立API
import usePrimaryColorStore from '@/store/appConfig/primaryColor';
import { lighten } from '@/utils/color';

import useThemeStore from '@/store/appConfig/theme';
import ThemeType from '@/config/theme';
import { darkTheme, lightTheme, useOsTheme } from 'naive-ui';

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

function getThemeUI(themeId: string | null) {
  let result;
  if (themeId === ThemeType.dark) {
    result = darkTheme;
  } else {
    result = lightTheme;
  }
  return result;
}

// useOsTheme 不能放到 computed中,否则会警告:
// onBeforeMount is called when there is no active component instance to be associated with.
const osThemeRef = useOsTheme();

export function getTheme() {
  const themeStore = useThemeStore();
  let result;
  if ([ThemeType.dark, ThemeType.light].indexOf(themeStore.themeId as ThemeType) > -1) {
    result = getThemeUI(themeStore.themeId);
  } else {
    result = getThemeUI(osThemeRef.value);
  }
  return result;
}
