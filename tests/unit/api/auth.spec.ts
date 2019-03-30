import faker from 'faker'
// import api from '@/api/auth'
jest.mock('@/utils/request')
import request from '@/utils/request'
import {
  signIn,
  register,
  resetPassword,
  signOut,
  getHash,
  getUserInfo,
  sendCode
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
  it('测试注册接口 ————————————————————————————- register', async () => {
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
    register(data)
    expect(request).toHaveBeenCalled()
    expect(request).toHaveBeenCalledWith({
      url: '/client/register',
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

describe('接口测试', () => {
  it('测试获取hash接口 ————————————————————————————- getHash', async () => {
    getHash()
    expect(request).toHaveBeenCalled()
    expect(request).toHaveBeenCalledWith({
      url: '/client/getHash',
      method: 'GET'
    })
  })
})

describe('接口测试', () => {
  it('测试个人信息接口 ————————————————————————————- getUserInfo', async () => {
    getUserInfo()
    expect(request).toHaveBeenCalled()
    expect(request).toHaveBeenCalledWith({
      url: '/client/getUserInfo',
      method: 'GET'
    })
  })
})

describe('接口测试', () => {
  it('测试短信接口 ————————————————————————————- sendCode', async () => {
    const randomAccount = faker.finance.account()
    const randomPassword = faker.internet.password()
    const randomHash = faker.random.word()
    const data: ISignIn = {
      account: randomAccount,
      password: randomPassword,
      hash: randomHash
    }
    sendCode(data)
    expect(request).toHaveBeenCalled()
    expect(request).toHaveBeenCalledWith({
      url: '/client/sendCode',
      method: 'POST',
      data
    })
  })
})