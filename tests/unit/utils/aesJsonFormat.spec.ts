// import faker from 'faker'
import CryptoJSAesJson from '@/utils/aesJsonFormat'

test('测试加密,测试加密的严谨性', () => {
  const stringifyCipherParams = {
    ciphertext: {},
    iv: {},
    salt: {}
  }
  const mockStringifyCb = jest.fn()

  CryptoJSAesJson.stringify(stringifyCipherParams, mockStringifyCb)
  expect(mockStringifyCb).toHaveBeenCalled()

  // const mockparseCb = jest.fn()
  // const parseJsonStr = {
  //   "ct": {},
  //   "iv": {},
  //   "s": {}
  // }
  // CryptoJSAesJson.parse(parseJsonStr, mockparseCb)
  // expect(mockparseCb).toHaveBeenCalled()
})