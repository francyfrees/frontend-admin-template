import '../../../init/initVueTpl'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import layout from '@/views/layout/layout.vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import mock from '../../mock/layout/layout'

const localVue = createLocalVue()
localVue.use(Vuex)

const fakeStore: any = new Vuex.Store({
  modules:mock.modules
})
const router: any = new Router({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: mock.constantRouter
})

const wrapper = shallowMount(layout, {
  store: fakeStore,
  localVue,
  mocks: {
    $t: () => {},
    $route: router
  }
})
const vm: any = (<any>wrapper).vm

describe('UI界面', () => {
  it('侧导航模拟点击', () => {
    const mockFn = jest.fn()
    wrapper.setMethods({
      closeSideBar: mockFn,
    })
    vm.handleClickOutside()
    expect(vm.closeSideBar).toHaveBeenCalled()
  })
})