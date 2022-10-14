import { createDiscreteApi } from 'naive-ui';
import { getThemeOverrides } from '@/utils/themeConfigProvider';

export function getDiscreteApi() {
  const { message, notification, dialog, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      configProviderProps: {
        themeOverrides: getThemeOverrides(),
      },
    },
  );
  return { message, notification, dialog, loadingBar };
}
