import 'tests/init/initVueTpl'

import faker from 'faker'

import flushPromises from 'flush-promises'

import { mount } from '@vue/test-utils'

import signInTpl from '@/views/auth/components/signIn.vue'

import * as auth from '@/api/auth'
import * as utils from '@/utils'


import { changeDefaultProperty } from 'tests/utils'

let wrapper: any, vm: any;
beforeEach(() => {
  wrapper = mount(signInTpl, {
    mocks: {
      $t: () => {},
      $router: []
    }
  })
  vm = wrapper.vm
})

describe('登录界面', () => {
  it('测试加载图标 ---loading', () => {
    const randomBoolean = faker.random.boolean()
    wrapper.setData({
      listLoading: false
    })
    vm.loading(randomBoolean)
    expect(vm.listLoading).toBe(randomBoolean)
  })

  it('测试选择ref ---refs', () => {
    const mockCb = jest.fn()
    vm.refs('from', mockCb)
    expect(mockCb).toHaveBeenCalled()
  })

  it('点击显示隐藏密码 ---showPwd', () => {
    wrapper.setData({
      pType: 'password',
      showIcon: 'icon-hide-pwd'
    })
    vm.showPwd()
    expect(vm.pType).toBe('text')
    expect(vm.showIcon).toBe('icon-show-pwd')

    vm.showPwd()
    expect(vm.pType).toBe('password')
    expect(vm.showIcon).toBe('icon-hide-pwd')
  })

  it('测试提交表单 ---formSubmit', () => {
    wrapper.setMethods({
      validateCb: jest.fn()
    })
    vm.formSubmit()
    expect(vm.validateCb).toHaveBeenCalled()
  })

  it('测试提交表单回调函数 ---validateCb', () => {
    wrapper.setMethods({
      validateCb: jest.fn()
    })
    vm.formSubmit()
    expect(vm.validateCb).toHaveBeenCalled()
  })

  it('测试登录正常 ---handleSignIn', async () => {
    const data = {
      account: 1234566,
      password: 'qwe123',
      hash: 'qwwrewre'
    }
    changeDefaultProperty(auth, 'signIn', jest.fn())
    vm.handleSignIn(data)
    await flushPromises()
    expect(auth.signIn).toHaveBeenCalled()
  })

  it('测试登录异常 ---handleSignIn', async () => {
    const data = {
      account: 1234566,
      password: 'qwe123',
      hash: 'qwwrewre'
    }
    changeDefaultProperty(auth, 'signIn', jest.fn(() => {
      throw new TypeError('type error')
    }))
    console.log = jest.fn()
    vm.handleSignIn(data)
    await flushPromises()
    expect(console.log).toHaveBeenCalled()
  })

  it('测试接口http发送成功，响应成功，执行 if ---apiSignInCb', async () => {
    const response = {
      data: {
        status: '1'
      }
    }
    wrapper.setMethods({
      $message: jest.fn()
    })
    vm.apiSignInCb(response)
    expect(vm.$message).toHaveBeenCalled()
  })

  it('测试接口http发送成功，响应失败，执行 else ---apiSignInCb', async () => {
    const response = {
      data: {
        status: '0'
      }
    }
    wrapper.setMethods({
      $message: jest.fn()
    })
    changeDefaultProperty(utils, 'errMsg', jest.fn())
    vm.apiSignInCb(response)
    expect(utils.errMsg).toHaveBeenCalled()
  })
})
