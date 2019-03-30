import '../../../init/initVueTpl'

import { getRenderedVm } from '../../../utils'
import auth from '@/views/auth/index.vue'

const { wrapper, vm } = getRenderedVm(auth)

wrapper.setData({
  page: "index"
})

describe('登录、注册、找回密码界面', () => {
  it('测试切换登陆界面', () => {
    vm.switchSignInPage()
    expect(vm.page).toBe('signInPage')
  })
})

describe('登录、注册、找回密码界面', () => {
  it('测试切换重置密码界面', () => {
    vm.switchForgetPage()
    expect(vm.page).toBe('forgetPage')
  })
})

describe('登录、注册、找回密码界面', () => {
  it('测试切换注册界面', () => {
    vm.switchRegisterPage()
    expect(vm.page).toBe('registerPage')
  })
})
