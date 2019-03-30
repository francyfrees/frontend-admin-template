import '../../../init/initVueTpl'
import { mount } from '@vue/test-utils'

import Refresh from '@/components/Refresh/index.vue'

describe('全屏测试', () => {
  it('测试点击有没有执行函数', () => {
    const wrapper = mount(Refresh)
    const vm: any = (<any>wrapper).vm
    wrapper.setMethods({
      click: jest.fn()
    })
    wrapper.find('i').trigger('click')
    expect(wrapper.find('i').is('i')).toBe(true)
    expect(vm.click).toHaveBeenCalled()
  })

  it('测试函数是否正确执行 ---click', () => {
    const wrapper = mount(Refresh)
    const vm: any = (<any>wrapper).vm
    location.reload = jest.fn()
    vm.click()
    expect(location.reload).toHaveBeenCalled()
  })
})
