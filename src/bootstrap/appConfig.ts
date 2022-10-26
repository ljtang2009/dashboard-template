import { get as getAppConfig } from '@/api/admin/app-config';
import appConfigDefault from '@/config/appConfigDefault.json';
import useLanguageStore from '@/store/appConfig/language';
import usePrimaryColorStore from '@/store/appConfig/primaryColor';
import useThemeStore from '@/store/appConfig/theme';
import useProductStore from '@/store/appConfig/product';

function store(appConfig: typeof appConfigDefault) {
  const languageStore = useLanguageStore();
  languageStore.$patch((state) => {
    state.languageId = appConfig.languageId;
  });
  const primaryColorStore = usePrimaryColorStore();
  primaryColorStore.$patch((state) => {
    state.isCustomPrimaryColor = appConfig.isCustomPrimaryColor;
    state.primaryColorId = appConfig.primaryColorId;
    state.customPrimaryColor = appConfig.customPrimaryColor;
  });
  const themeStore = useThemeStore();
  themeStore.$patch((state) => {
    state.themeId = appConfig.themeId;
  });
  const productStore = useProductStore();
  productStore.$patch((state) => {
    state.productName = appConfig.productName;
  });
}

export async function init() {
  let appConfigDB;
  try {
    appConfigDB = await getAppConfig();
  } catch (err) {}
  if (appConfigDB) {
    appConfigDB = { ...appConfigDefault, ...appConfigDB };
    store(appConfigDB);
  }
}
