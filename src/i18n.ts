import { createI18n, I18n, VueMessageType } from 'vue-i18n';
import { nextTick } from 'vue';
import { getAppConfig } from '@/config/appConfig';
import languages from '@/config/languages';
import { LocaleMessage } from '@intlify/core-base';
import { getDiscreteApi } from '@/utils/discreteApi';

async function loadLocaleFile(locale: string) {
  return await import(/* webpackChunkName: "locale-[request]" */ `@/locales/${locale}.json`);
}

let i18nInstance: I18n;
// 创建多语言实例
export async function setupI18n() {
  const appConfig = getAppConfig();
  let locale = 'zh-cn';
  for (const item of languages) {
    if (item.id === appConfig['languageId']) {
      locale = item.i18nLocal;
      break;
    }
  }
  const fallbackLocale = 'en-us'; // 兜底
  const fallbackLocaleMessage = await loadLocaleFile(fallbackLocale);
  const messages: { [x: string]: LocaleMessage<VueMessageType> } = {
    [fallbackLocale]: fallbackLocaleMessage.default,
  };
  if (fallbackLocale !== locale) {
    // 默认语言
    const message = await loadLocaleFile(locale);
    messages[locale] = message.default;
  }
  i18nInstance = createI18n({
    globalInjection: true,
    legacy: false,
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages,
  });
  return i18nInstance;
}

// 设置i18n语言
// 该方法不应该直接被调用。而是 修改 languageStore 的 languageId，从而 触发 App.vue的 languageStore.$subscribe
export async function setI18nLanguage(locale: string) {
  for (const item of languages) {
    if (item.id === locale) {
      if (!i18nInstance.global.availableLocales.includes(item.i18nLocal)) {
        const { loadingBar } = getDiscreteApi();
        loadingBar.start();
        await loadLocaleMessages(item.i18nLocal);
        loadingBar.finish();
      }
      if (typeof i18nInstance.global.locale === 'string') {
        i18nInstance.global.locale = item.i18nLocal;
      } else {
        i18nInstance.global.locale.value = item.i18nLocal;
      }
      /**
       * NOTE:
       * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
       * The following is an example for axios.
       *
       * axios.defaults.headers.common['Accept-Language'] = locale
       */
      document.querySelector('html')!.setAttribute('lang', locale);
      break;
    }
  }
}

/**
 * 动态加载语言文件
 * @param locale
 * @returns
 */
async function loadLocaleMessages(locale: string) {
  // load locale messages with dynamic import
  const messages = await loadLocaleFile(locale);
  // set locale and locale message
  i18nInstance.global.setLocaleMessage(locale, messages.default);

  return nextTick();
}
