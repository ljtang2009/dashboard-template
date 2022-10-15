// 提供 theme， 不仅给全局化配置，还又独立API
import usePrimaryColorStore from '@/store/appConfig/primaryColor';
import { lighten } from '@/utils/color';

import useThemeStore from '@/store/appConfig/theme';
import ThemeType from '@/config/theme';
import { darkTheme, lightTheme, useOsTheme } from 'naive-ui';

export function getThemeOverrides() {
  const primaryColorStore = usePrimaryColorStore();
  const result: Record<string, any> = {
    common: {
      fontWeightStrong: '600',
    },
  };
  const primaryColor = primaryColorStore.primaryColor;
  const originalPrimaryColor = '#18a058';
  // 如果和原生色相同,则不改主色
  if (primaryColor !== originalPrimaryColor) {
    const lightenColor = lighten(primaryColor, 6);
    result['common'].primaryColor = primaryColor;
    result['common'].primaryColorHover = lightenColor;
    result['common'].primaryColorPressed = lightenColor;
    result['LoadingBar'] = {
      colorLoading: primaryColor,
    };
  }
  return result;
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
