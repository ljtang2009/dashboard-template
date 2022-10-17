export default {
  appConfig: {
    systemConfig: '@:common.system@:common.config',
    save: '@:common.save',
    reset: '@:common.reset',
    close: '@:common.close',
    callback: {
      saveSuccessfully: '@:common.save@:common.successfully',
      resetSuccessfully: '@:common.reset@:common.successfully',
    },
    modules: {
      primaryColor: {
        title: '主色',
        Manual: '自选',
      },
      language: {
        title: '语言',
      },
      theme: {
        title: '主题',
        light: '亮',
        dark: '暗',
      },
      product: {
        title: '产品',
        name: '@:common.name',
        logo: '@:common.logo',
        dragOrClickToUpload: '@:common.dragOrClickToUpload',
        fileFormatError: '@:common.fileFormatError',
        fileMaxSizeError: '@:common.fileMaxSizeError',
      },
    },
  },
};
