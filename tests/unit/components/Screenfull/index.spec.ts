import '../../../init/initVueTpl'
import { shallowMount } from '@vue/test-utils'

import Screen from '@/components/Screenfull/index.vue'

const wrapper = shallowMount(Screen)
const vm: any = (<any>wrapper).vm

describe('全屏测试', () => {
  it('测试函数是否执行', () => {
    const mockData = {
      enabled: false,
      toggle: jest.fn()
    }
    wrapper.setData({
      screenf: mockData
    })
    wrapper.setMethods({
      $message: jest.fn()
    })
    vm.click()
    expect(vm.$message).toHaveBeenCalled()

    mockData.enabled = true
    vm.click()
    expect(vm.screenf.toggle).toHaveBeenCalled()
  })
})

