import CryptoJS from 'crypto-js'

const cryptKey = process.env['STORAGE_ENCRYPT_KEY']!

/**
 * 获取 item
 * @param option
 * @returns
 */
export function getItem(option: { key: string, storage?: Storage }) {
  const storage = option.storage ? option.storage : window.localStorage
  let originalText = null
  const storageStr = storage.getItem(option.key)
  if (storageStr !== null) {
    originalText = CryptoJS.AES.decrypt(storageStr, cryptKey).toString(CryptoJS.enc.Utf8)
  }
  return originalText
}

/**
 * 设置 item
 * @param option
 */
export function setItem(option: { key: string, value: string, storage?: Storage }) {
  const storage = option.storage ? option.storage : window.localStorage
  storage.setItem(option.key, CryptoJS.AES.encrypt(option.value, cryptKey).toString())
}
