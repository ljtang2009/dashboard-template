export default {
  appConfig: {
    systemConfig: '@.capitalize:common.system @.capitalize:common.config',
    save: '@.upper:common.save',
    reset: '@.upper:common.reset',
    close: '@.upper:common.close',
    callback: {
      saveSuccessfully: '@.capitalize:common.save @.capitalize:common.successfully .',
      resetSuccessfully: '@.capitalize:common.reset @.capitalize:common.successfully .',
    },
    customizable: '@.capitalize:common.customizable',
    modules: {
      primaryColor: {
        title: 'Primary Color',
        Manual: 'MANUAL',
      },
      language: {
        title: 'Language',
      },
      theme: {
        title: 'Theme',
        light: 'LIGHT',
        dark: 'DARK',
        dependOnOs: 'OS',
      },
      product: {
        title: 'Product',
        name: '@.upper:common.name',
        logo: '@.upper:common.logo',
        dragOrClickToUpload: '@:common.dragOrClickToUpload',
        fileFormatError: '@:common.fileFormatError',
        fileMaxSizeError: '@:common.fileMaxSizeError',
      },
    },
  },
};
