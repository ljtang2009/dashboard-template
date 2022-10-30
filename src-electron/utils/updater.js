const { autoUpdater } = require('electron-updater');
const semver = require('semver');
// const { logger } = require('./logger');
const { tempDir } = require('../config');
const path = require('path');
const { copy, pathExists, remove } = require('fs-extra');
const { app } = require('electron');

const updateTempDir = path.resolve(tempDir, './update-temp');
// TODO 附加日志应该更新后执行，否则日志文件会有权限问题
// autoUpdater.logger = logger;
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;
autoUpdater.autoRunAppAfterInstall = true;
autoUpdater.disableWebInstaller = true;

/**
 * 检查是否有更新
 * @returns true 表示需要更新
 */
async function checkForUpdates() {
  const updateCheckResult = await autoUpdater.checkForUpdates();
  return semver.gt(updateCheckResult.updateInfo.version, autoUpdater.currentVersion.version);
}

exports.checkForUpdates = checkForUpdates;

/**
 * 下载更新
 * @param {*} callbackProcess 显示进度
 */
async function downloadUpdate(callbackProcess) {
  if (callbackProcess) {
    autoUpdater.signals.progress((info) => {
      callbackProcess(info);
    });
  }
  await autoUpdater.downloadUpdate();
}

exports.downloadUpdate = downloadUpdate;

/**
 * 传输用户文件到临时文件夹
 */
async function transUserFilesToTempDir() {
  const copyDirList = [
    './.log',
    './db',
    './public-api',
  ];
  const copyFunctionList = [];
  for (const copyDir of copyDirList) {
    copyFunctionList.push(
      (() => {
        return new Promise((resolve, reject) => {
          copy(path.resolve(process.cwd(), copyDir), path.resolve(updateTempDir, copyDir), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      })(),
    );
  }
  await Promise.all(copyFunctionList);
}

/**
 * 传输用户文件从临时文件夹到App目录
 */
async function transUserFilesToAppDirFromTempDir() {
  if (await pathExists(updateTempDir)) {
    // 有目录表示需要传输
    await copy(updateTempDir, process.cwd());
    await remove(updateTempDir);
  }
}

exports.transUserFilesToAppDirFromTempDir = transUserFilesToAppDirFromTempDir;

/**
 * 推出并更新
 */
async function quitAndInstall() {
  if (app.isPackaged) {
    await transUserFilesToTempDir();
  }
  // 传输用户数据到临时文件夹
  autoUpdater.quitAndInstall();
}

exports.quitAndInstall = quitAndInstall;

/**
 * 一键更新
 */
async function oneKeyUpdate() {
  if (await checkForUpdates()) {
    await downloadUpdate();
    await quitAndInstall();
  }
}

exports.oneKeyUpdate = oneKeyUpdate;
