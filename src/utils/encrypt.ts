import CryptoJS from 'crypto-js'
import CryptoJSAesJson from '@/utils/aesJsonFormat'

export function passwordEncrypt(
  hash: string,
  password: string,
  cb?: any
): string {
  let newPassword = null
  newPassword = CryptoJS.AES.encrypt(JSON.stringify(password), hash, {
    format: CryptoJSAesJson
  }).toString()
  cb && cb()
  return newPassword
}
