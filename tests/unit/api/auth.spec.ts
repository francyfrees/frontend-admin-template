import faker from 'faker'
// import api from '@/api/auth'
jest.mock('@/utils/request')
import request from '@/utils/request'
import {
  signIn,
  resetPassword,
  signOut,
} from '@/api/auth'

import { ISignIn, IRegister, IForget } from '@/interface/api/auth'

describe('接口测试', () => {
  it('测试登录接口 ————————————————————————————- signIn', async () => {
    // mockAxios.get.mockImplementationOnce(() =>
    //   Promise.resolve({
    //     data: { results: ['cat.jpg'] }
    //   })
    // )
    // const response = await unsplish('cats')
    // expect(response).toEqual(['cat.jpg'])
    // expect(mockAxios.get).toHaveBeenCalledTimes(1)
    // expect(mockAxios.get).toHaveBeenCalledWith(
    //   'https://api.unsplash.com/search/photos',
    //   {
    //     params: {
    //       client_id: process.env.REACT_APP_UNSPLASH_TOKEN,
    //       query: 'cats'
    //     }
    //   }
    // )

    const randomAccount = faker.finance.account()
    const randomPassword = faker.internet.password()
    const randomHash = faker.random.word()
    const data: ISignIn = {
      account: randomAccount,
      password: randomPassword,
      hash: randomHash
    }
    signIn(data)
    expect(request).toHaveBeenCalled()
    expect(request).toHaveBeenCalledWith({
      url: '/client/signIn',
      method: 'POST',
      data
    })
  })
})

describe('接口测试', () => {
  it('测试重置密码接口 ————————————————————————————- resetPassword', async () => {
    const randomPhone = faker.phone.phoneNumber()
    const randomPassword = faker.internet.password()
    const randomCode = '123qwe'
    const randomHash = faker.random.word()
    const data: IRegister = {
      phone: randomPhone,
      code: randomCode,
      password: randomPassword,
      hash: randomHash
    }
    resetPassword(data)
    expect(request).toHaveBeenCalled()
    expect(request).toHaveBeenCalledWith({
      url: '/client/resetPassword',
      method: 'POST',
      data
    })
  })
})

describe('接口测试', () => {
  it('测试退出登陆接口 ————————————————————————————- signOut', async () => {
    signOut()
    expect(request).toHaveBeenCalled()
    expect(request).toHaveBeenCalledWith({
      url: '/client/signOut',
      method: 'GET'
    })
  })
})