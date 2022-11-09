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
    customizable: '@:common.customizable',
    modules: {
      primaryColor: {
        title: '主色',
        Manual: '自選',
      },
      language: {
        title: '語言',
      },
      theme: {
        title: '主题',
        light: '亮',
        dark: '暗',
        dependOnOs: '隨系統',
      },
      product: {
        title: '產品',
        name: '@:common.name',
        logo: '@:common.logo',
        dragOrClickToUpload: '@:common.dragOrClickToUpload',
        fileFormatError: '@:common.fileFormatError',
        fileMaxSizeError: '@:common.fileMaxSizeError',
      },
    },
  },
};
