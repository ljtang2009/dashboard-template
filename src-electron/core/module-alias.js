const { addAlias } = require('module-alias');

exports.register = function register() {
  addAlias('@src-electron', process.cwd() + '/src-electron');
  addAlias('@dist-api', process.cwd() + '/dist-api');
};
