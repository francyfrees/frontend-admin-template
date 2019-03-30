import faker from 'faker'
import { passwordEncrypt } from '@/utils/encrypt'

test('测试加密,测试加密的严谨性', () => {
  let hash = '1574bddb75c78a6fd2251d61e2993b5146201319'
  const password = faker.internet.password()
  const mock = jest.fn()
  // 测试加密函数有没有执行
  passwordEncrypt(hash, password, mock)
  expect(mock).toHaveBeenCalled()
})