import '../../../init/initVueTpl'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const fakeStore: any = new Vuex.Store({
  modules: {
    app: {
      namespaced: true,
      state: {
        theme: 'bee',
        device: 'desktop'
      },
      actions: {
        setTheme: jest.fn()
      }
    }
  }
})

import ThemeSelect from '@/components/ThemeSelect/index.vue'

describe('测试换肤功能', () => {
  it('测试点击有没有执行函数', () => {
    const wrapper = shallowMount(ThemeSelect, {
      store: fakeStore,
      localVue,
      mocks: {
        $t: () => {}
      }
    })
    const vm: any = (<any>wrapper).vm
    wrapper.setMethods({
      $message: jest.fn(),
      changeTheme: jest.fn()
    })
    vm.handleSetTheme('rose')
    expect(vm.$message).toHaveBeenCalled()
    expect(vm.changeTheme).toHaveBeenCalled()
  })

  it('测试执行换肤函数', () => {
    const wrapper = shallowMount(ThemeSelect, {
      store: fakeStore,
      localVue,
      mocks: {
        $t: () => {}
      }
    })
    const vm: any = (<any>wrapper).vm
    const element = {
      className: ''
    }
    vm.changeTheme(element, 'app')
    expect(element.className).toBe('app')
  })
})
