import { shallowMount } from '@vue/test-utils'
import '../../init/initVueTpl'

import SidebarItem from '@/views/layout/components/Sidebar/SidebarItem.vue'

describe('测试element-ui语言转换', () => {
  it('测试generateTitle hasKey 为 true', done => {
    const wrapper = shallowMount(SidebarItem, {
      mocks: {
        $te: (title: string) => true,
        $t: (title: string) => '名称'
      }
    })
    const vm: any = (<any>wrapper).vm
    const res = vm.generateTitle('name')
    expect(res).toBe('名称')
    done()
  })

  it('测试generateTitle hasKey 为 false', done => {
    const wrapper = shallowMount(SidebarItem, {
      mocks: {
        $te: (title: string) => false,
        $t: (title: string) => false
      }
    })
    const vm: any = (<any>wrapper).vm
    const res = vm.generateTitle('name')
    expect(res).toBe('name')
    done()
  })
})
