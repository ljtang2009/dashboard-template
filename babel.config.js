const IS_PROD = process.env.NODE_ENV === 'production';

const plugins = [];
if (IS_PROD) {
  plugins.push('transform-remove-console');
  plugins.push('transform-remove-debugger');
}

module.exports = {
  presets: [
    '@babel/env',
    [
      '@babel/preset-typescript',
      {
        isTSX: true, // 必须设置，否者编译tsx时会报错
        allowNamespaces: true,
        allExtensions: true, // 必须设置，否者编译.vue 文件中ts 代码会报错
      },
    ],
  ],
  plugins,
};
