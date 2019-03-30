import faker from 'faker'
import '../../../init/initVueTpl'
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import VerificationCode from '@/components/VerificationCode/index.vue'

describe('短信组件测试', () => {
  it('测试倒计时函数 if分支 ---finish', () => {
    const wrapper = shallowMount(VerificationCode)
    const vm: any = (<any>wrapper).vm
    wrapper.setData({
      count: 1,
      sendSuccess: false,
      time: 150
    })
    jest.useFakeTimers()
    vm.finish()
    jest.runAllTimers()
    expect(vm.count).toBe(vm.time)
    expect(vm.sendSuccess).toBe(false)
    jest.useRealTimers()
  })

  it('测试倒计时函数 else分支 ---finish', () => {
    const wrapper = shallowMount(VerificationCode)
    const vm: any = (<any>wrapper).vm
    wrapper.setData({
      count: 150,
      sendSuccess: false
    })

    jest.useFakeTimers()
    vm.finish()
    jest.runAllTimers()
    expect(vm.count).toBe(150)
    expect(vm.sendSuccess).toBe(false)
    jest.useRealTimers()
  })

  it('测试函数锁 ---handleLock', () => {
    const wrapper = shallowMount(VerificationCode)
    const vm: any = (<any>wrapper).vm
    const boolean = faker.random.boolean()
    wrapper.setData({
      lock: boolean
    })
    vm.handleLock(!boolean)
    expect(vm.lock).toBe(!boolean)
  })

  it('测试时间锁 ---handleLock', () => {
    const wrapper = shallowMount(VerificationCode)
    const vm: any = (<any>wrapper).vm
    const number = faker.random.number()
    wrapper.setMethods({
      handleLock: jest.fn()
    })
    jest.useFakeTimers()
    vm.timerLock(number)
    jest.runAllTimers()
    expect(vm.handleLock).toHaveBeenCalled()
    jest.useRealTimers()
  })

  it('测试短信发送正常 ---sendCodeFn', async () => {
    const wrapper = shallowMount(VerificationCode)
    const vm: any = (<any>wrapper).vm
    wrapper.setMethods({
      sendCodeApiCb: jest.fn()
    })
    wrapper.setData({
      iconLoading: false
    })
    vm.sendCodeFn()
    await flushPromises()
    expect(vm.sendCodeApiCb).toHaveBeenCalled()
    expect(vm.iconLoading).toBe(false)
  })

  it('测试短信发送异常 ---sendCodeFn', async () => {
    const wrapper = shallowMount(VerificationCode)
    const vm: any = (<any>wrapper).vm
    wrapper.setMethods({
      sendCodeApiCb: jest.fn(() => {
        throw new TypeError('type error')
      }),
      $emit: jest.fn()
    })
    vm.sendCodeFn()
    await flushPromises()
    expect(vm.$emit).toHaveBeenCalled()
  })

  it('测试短信发送成功,返回信息正确 ---sendCodeApiCb', () => {
    const wrapper = shallowMount(VerificationCode)
    const vm: any = (<any>wrapper).vm
    const mock = {
      data: {
        status: 1,
        data: {
          detail: "发送成功"
        }
      }
    }
    wrapper.setMethods({
      finish: jest.fn()
    })
    vm.sendCodeApiCb(mock)
    expect(vm.finish).toHaveBeenCalled()
  })

  it('测试短信发送成功,捕捉接口返回信息错误 ---sendCodeApiCb', () => {
    const wrapper = shallowMount(VerificationCode)
    const vm: any = (<any>wrapper).vm
    const mock = {
      data: {
        status: 1,
        list: {
          detail: "发送成功"
        }
      }
    }
    console.log = jest.fn()
    vm.sendCodeApiCb(mock)
    expect(console.log).toHaveBeenCalled()
  })

  it('测试短信发送失败 ---sendCodeApiCb', () => {
    const wrapper = shallowMount(VerificationCode)
    const vm: any = (<any>wrapper).vm
    const mock = {
      data: {
        status: 0,
        data: {
          detail: "发送失败"
        }
      }
    }
    wrapper.setMethods({
      $emit: jest.fn()
    })
    vm.sendCodeApiCb(mock)
    expect(vm.$emit).toHaveBeenCalled()
  })

  it('测试短信发送成功，禁止再次发送 ---sendClick', () => {
    const wrapper = shallowMount(VerificationCode)
    const vm: any = (<any>wrapper).vm
    wrapper.setMethods({
      timerLock: jest.fn(),
      handleLock: jest.fn(),
      sendCodeFn: jest.fn()
    })
    wrapper.setData({
      sendSuccess: true
    })
    const unitCb = jest.fn()
    vm.sendClick(unitCb)
    expect(unitCb).toHaveBeenCalled()
  })

  it('测试短信发送加锁 ---sendClick', () => {
    const wrapper = shallowMount(VerificationCode)
    const vm: any = (<any>wrapper).vm
    wrapper.setMethods({
      timerLock: jest.fn(),
      handleLock: jest.fn(),
      sendCodeFn: jest.fn()
    })
    wrapper.setData({
      sendSuccess: false,
      lock: false
    })
    vm.sendClick()
    expect(vm.timerLock).toHaveBeenCalled()
  })

  it('测试短信发送失败，不满足发送条件，手机号码不正确 ---sendClick', () => {
    const wrapper = shallowMount(VerificationCode)
    const vm: any = (<any>wrapper).vm
    wrapper.setMethods({
      timerLock: jest.fn(),
      handleLock: jest.fn(),
      sendCodeFn: jest.fn()
    })
    wrapper.setData({
      sendSuccess: false,
      lock: true,
      mobile: ''
    })
    vm.sendClick()
    expect(vm.handleLock).toHaveBeenCalled()
    expect(vm.timerLock).toHaveBeenCalled()
  })

  it('测试满足发送条件，发送短信 ---sendClick', () => {
    const wrapper = shallowMount(VerificationCode)
    const vm: any = (<any>wrapper).vm
    wrapper.setMethods({
      timerLock: jest.fn(),
      handleLock: jest.fn(),
      sendCodeFn: jest.fn()
    })
    wrapper.setData({
      sendSuccess: false,
      lock: true
    })
    wrapper.setProps({ mobile: '18691887842' })
    vm.sendClick()
    expect(vm.sendCodeFn).toHaveBeenCalled()
  })
})