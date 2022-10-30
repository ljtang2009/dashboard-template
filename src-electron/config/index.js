const { resolve } = require('path');
const os = require('os');
const { app } = require('electron');

exports.tempDir = resolve(os.tmpdir(), app.name);
