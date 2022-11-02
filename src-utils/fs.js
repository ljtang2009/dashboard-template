const fs = require('fs-extra');
const path = require('path');

/**
 * 处理子项
 * @param { string } childPath
 * @returns { PromiseLike<Array<string>> }
 */
function handleChild(childPath) {
  return new Promise((resolve, reject) => {
    fs.stat(childPath)
      .then((stat) => {
        if (stat.isDirectory()) {
          resolve(getFilesByDir(childPath));
        } else {
          resolve([childPath]);
        }
      })
      .catch((err) => reject(err));
  });
}

/**
 * 处理子项列表
 * @param { string } dir 父目录
 * @param { Array<string> } arr 子项名称列表
 * @returns { PromiseLike<Array<string>> }
 */
function handleChildren(dir, arr) {
  return new Promise((resolve, reject) => {
    const childrenHandleFunctions = [];
    for (const item of arr) {
      const itemPath = path.resolve(dir, item);
      childrenHandleFunctions.push(handleChild(itemPath));
    }
    Promise.all(childrenHandleFunctions).then((filePathList) => {
      // filePathList 是二维数组
      let result = [];
      for (const item of filePathList) {
        if (item) {
          result = [...result, ...item];
        }
      }
      resolve(result);
    });
  });
}

/**
 * 递归获取文件
 * @param { string } dir
 * @returns { PromiseLike<Array<string>> }
 */
function getFilesByDir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir)
      .then((arr) => handleChildren(dir, arr))
      .then((fileList) => resolve(fileList))
      .catch((err) => reject(err));
  });
}

exports.getFilesByDir = getFilesByDir;
