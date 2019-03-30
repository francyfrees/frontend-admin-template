import '../../../../init/initVueTpl'

import faker from 'faker'

import registerTpl from '@/views/auth/components/register.vue'
import { mount } from '@vue/test-utils'

jest.mock('@/api/auth')

describe('注册界面', () => {
  it('测试选择ref', () => {
    const wrapper = mount(registerTpl, {
      mocks: {
        $t: () => {}
      }
    })
    const vm: any = (<any>wrapper).vm
    const mockCb = jest.fn()
    vm.refs('phone', mockCb)
    expect(mockCb).toHaveBeenCalled()
  })
})

describe('注册界面', () => {
  it('测试加载图标', () => {
    const wrapper = mount(registerTpl, {
      mocks: {
        $t: () => {}
      }
    })
    const vm: any = (<any>wrapper).vm
    const randomBoolean = faker.random.boolean()
    wrapper.setData({
      listLoading: false
    })
    vm.loading(randomBoolean)
    expect(vm.listLoading).toBe(randomBoolean)
  })
})

describe('注册界面', () => {
  it('点击显示隐藏设置密码', () => {
    const wrapper = mount(registerTpl, {
      mocks: {
        $t: () => {}
      }
    })
    const vm: any = (<any>wrapper).vm
    vm.showPwd()
    expect(vm.pType).toEqual('text')
    expect(vm.showIcon).toEqual('icon-show-pwd')

    vm.showPwd()
    expect(vm.pType).toEqual('password')
    expect(vm.showIcon).toEqual('icon-hide-pwd')
  })
})

describe('注册界面', () => {
  it('点击显示隐藏确认密码', () => {
    const wrapper = mount(registerTpl, {
      mocks: {
        $t: () => {}
      }
    })
    const vm: any = (<any>wrapper).vm
    vm.showRePwd()
    expect(vm.pRePasswordType).toEqual('text')
    expect(vm.showReIcon).toEqual('icon-show-pwd')

    vm.showRePwd()
    expect(vm.pRePasswordType).toEqual('password')
    expect(vm.showReIcon).toEqual('icon-hide-pwd')
  })
})

// describe('注册界面', () => {
//   it('获取hash', () => {

//   })
// })

describe('注册界面', () => {
  const wrapper = mount(registerTpl, {
    mocks: {
      $t: () => {}
    }
  })
  const vm: any = (<any>wrapper).vm
  wrapper.setMethods({
    $message: jest.fn()
  })
  it('验证码发送成功', () => {
    vm.codeSendSuccess()
    expect(vm.$message).toHaveBeenCalled()
  })

  it('验证码发送失败', () => {
    vm.codeSendError()
    expect(vm.$message).toHaveBeenCalled()
  })
})

describe('注册界面', () => {
  it('测试重置表单', () => {
    const wrapper = mount(registerTpl, {
      mocks: {
        $t: () => {}
      }
    })
    const vm: any = (<any>wrapper).vm
    vm.resetFrom()
    expect(vm.form).toEqual({
      phone: '',
      code: '',
      password: '',
      rePassword: '',
      hash: ''
    })
  })
})

describe('注册界面', () => {
  const wrapper = mount(registerTpl, {
    mocks: {
      $t: () => {}
    }
  })
  const vm: any = (<any>wrapper).vm
  it('测试手动提交表单', () => {
    wrapper.setMethods({
      validateCb: jest.fn()
    })
    vm.handleRegister()
    expect(vm.validateCb).toHaveBeenCalled()
  })
})

describe('注册界面', () => {
  const wrapper = mount(registerTpl, {
    mocks: {
      $t: () => {}
    }
  })
  const vm: any = (<any>wrapper).vm
  it('测试表单提交回调函数通过', () => {
    const unitCb = jest.fn()
    vm.validateCb(false, unitCb)
    expect(unitCb).toHaveBeenCalled()
  })
  it('测试表单提交回调函数, 设置密码与原密码不相符', () => {
    wrapper.setData({
      form: {
        phone: '18691887842',
        code: 'qweqwe',
        password: 'geiniwen!123.0',
        rePassword: 'geiniwen!123',
        hash: 'geiniwen'
      }
    })
    wrapper.setMethods({
      $message: jest.fn(),
      registerFn: jest.fn(),
      loading: jest.fn()
    })
    vm.validateCb(true)
    expect(vm.$message).toHaveBeenCalled()
  })

  it('测试表单提交回调函数通过', () => {
    wrapper.setData({
      form: {
        phone: '18691887842',
        code: 'qweqwe',
        password: 'geiniwen!123.0',
        rePassword: 'geiniwen!123.0',
        hash: 'geiniwen'
      }
    })
    wrapper.setMethods({
      $message: jest.fn(),
      registerFn: jest.fn(),
      loading: jest.fn()
    })
    vm.validateCb(true)
    expect(vm.loading).toHaveBeenCalled()
  })
})

// describe('注册界面', () => {
//   it('测试注册表单提交', () => {
//   })
// })
