import { getItem as getItemStorage, setItem as setItemStorage } from '@/utils/clientStorage'
import { get as getAppConfig } from '@/api/admin/app-config';
import appConfigDefault from '@/config/appConfigDefault';
import useLanguageStore from '@/store/appConfig/language';
import usePrimaryColorStore from '@/store/appConfig/primaryColor';
import useThemeStore from '@/store/appConfig/theme';
import useProductStore from '@/store/appConfig/product';

function store(appConfig: typeof appConfigDefault) {
  const languageStore = useLanguageStore();
  languageStore.init(appConfig)
  const primaryColorStore = usePrimaryColorStore();
  primaryColorStore.init(appConfig)
  const themeStore = useThemeStore();
  themeStore.init(appConfig)
  const productStore = useProductStore();
  productStore.init(appConfig)
}

const storageKey = 'app_config'

function getAppConfigStorage() {
  let storageString = getItemStorage({ key: storageKey })
  let result
  if (storageString !== null) {
    result = JSON.parse(storageString)
  }
  else {
    result = {}
  }
  return result;
}

export async function init() {
  let appConfigDB;
  try {
    appConfigDB = await getAppConfig();
  } catch (err) { }
  if (appConfigDB) {
    const appConfigStorage = getAppConfigStorage()
    appConfigDB = { ...appConfigDefault, ...appConfigDB, ...appConfigStorage };
    store(appConfigDB);
  }
}

/**
 * 保存到 storage
 * @param option
 */
export function saveStorage(option: Record<string, string>) {
  let storageString = getItemStorage({ key: storageKey })
  let storageObj
  if (storageString) {
    storageObj = JSON.parse(storageString)
  }
  else {
    storageObj = {}
  }
  for (const key in option) {
    if (option.hasOwnProperty(key)) {
      storageObj[key] = option[key]
    }
  }
  setItemStorage({ key: storageKey, value: JSON.stringify(storageObj) })
}
