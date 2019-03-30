import '../../../init/initVueTpl'
import { shallowMount } from '@vue/test-utils'

import ScrollPane from '@/components/ScrollPane/index.vue'

describe('滚动条测试', () => {
  const wrapper = shallowMount(ScrollPane)
  const vm: any = (<any>wrapper).vm
  it('测试滚动函数是否执行 if 语句 ---handleScroll', () => {
    const e = {
      wheelDelta: 10
    }
    wrapper.setData({
      left: 10
    })
    vm.handleScroll(e)
    expect(vm.left).toBe(0)
  })

  it('测试滚动函数是否执行 else 语句 ---handleScroll', () => {
    const e = {
      wheelDelta: 0
    }
    wrapper.setMethods({
      eventDeltaElse: jest.fn()
    })
    vm.handleScroll(e)
    expect(vm.eventDeltaElse).toHaveBeenCalled()
  })
})

describe('滚动条测试', () => {
  const wrapper = shallowMount(ScrollPane)
  const vm: any = (<any>wrapper).vm
  it('测试滚动函数else分支函数是否执行 if 语句 ---eventDeltaElse', () => {
    const eventDelta = 0
    const $containerWidth = 15
    const $wrapperWidth = 5
    wrapper.setData({
      left: 10
    })
    wrapper.setMethods({
      judgeWrapperWidthAndSetLeft: jest.fn()
    })
    vm.eventDeltaElse(eventDelta, $containerWidth, $wrapperWidth)
    expect(vm.judgeWrapperWidthAndSetLeft).toHaveBeenCalled()
  })

  it('测试滚动函数else分支函数是否执行 else 语句 ---eventDeltaElse', () => {
    const eventDelta = 0
    const $containerWidth = 20
    const $wrapperWidth = 0
    wrapper.setData({
      left: 10
    })
    wrapper.setMethods({
      judgeWrapperWidthAndSetLeft: jest.fn()
    })
    vm.eventDeltaElse(eventDelta, $containerWidth, $wrapperWidth)
    expect(vm.left).toBe(0)
  })
})

describe('滚动条测试', () => {
  const wrapper = shallowMount(ScrollPane)
  const vm: any = (<any>wrapper).vm
  it('测试 eventDeltaElse 函数 if 分支函数是否执行 if 语句 ---judgeWrapperWidthAndSetLeft', () => {
    const eventDelta = 0
    const $containerWidth = 20
    const $wrapperWidth = 0
    wrapper.setData({
      left: 2
    })
    vm.judgeWrapperWidthAndSetLeft(eventDelta, $containerWidth, $wrapperWidth)
    expect(vm.left).toBe(2)
  })

  it('测试 eventDeltaElse 函数 else 分支函数是否执行 if 语句 ---judgeWrapperWidthAndSetLeft', () => {
    const eventDelta = 1
    const $containerWidth = 20
    const $wrapperWidth = 20
    wrapper.setData({
      left: 10
    })
    vm.judgeWrapperWidthAndSetLeft(eventDelta, $containerWidth, $wrapperWidth)
    expect(vm.left).toBe(11)
  })
})

describe('移动滚动条', () => {
  it('测试 moveToTarget 函数 是否执行', () => {
    const wrapper = shallowMount(ScrollPane)
    const vm: any = (<any>wrapper).vm
    const $target = {
      offsetLeft: 5,
      offsetWidth: 5
    }
    wrapper.setMethods({
      setTagLeft: jest.fn()
    })
    vm.moveToTarget($target)
    expect(vm.setTagLeft).toHaveBeenCalled()
  })

  it('测试 setTagLeft 函数 if 语句是否执行', () => {
    const wrapper = shallowMount(ScrollPane)
    const vm: any = (<any>wrapper).vm
    const $targetLeft = -20
    const $targetWidth = 10
    const $containerWidth = 10
    wrapper.setData({
      left: 10
    })
    vm.setTagLeft($targetLeft, $targetWidth, $containerWidth)
    expect(vm.left).toBe(35)
  })

  it('测试 moveToTarget 函数 else if 语句是否执行', () => {
    const wrapper = shallowMount(ScrollPane)
    const vm: any = (<any>wrapper).vm
    const $targetLeft = -1
    const $targetWidth = -10
    const $containerWidth = 15
    wrapper.setData({
      left: 10
    })
    vm.setTagLeft($targetLeft, $targetWidth, $containerWidth)
    expect(vm.left).toBe(10)
  })

  it('测试 moveToTarget 函数 else 语句是否执行', () => {
    const wrapper = shallowMount(ScrollPane)
    const vm: any = (<any>wrapper).vm
    const $targetLeft = -1
    const $targetWidth = -10
    const $containerWidth = 10
    wrapper.setData({
      left: 10
    })
    vm.setTagLeft($targetLeft, $targetWidth, $containerWidth)
    expect(vm.left).toBe(6)
  })
})
