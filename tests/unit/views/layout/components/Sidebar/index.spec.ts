import '../../../../../init/initVueTpl'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import SidebarItem from '@/views/layout/components/Sidebar/SidebarItem.vue'
import Vuex from 'vuex'
import mock from '../../../../mock/layout/components/SidebarItem'


const localVue = createLocalVue()
localVue.use(Vuex)

const fakeStore: any = new Vuex.Store({
  modules: mock.modules
})

const wrapper = shallowMount(SidebarItem, {
  store: fakeStore,
  localVue,
  mocks: {
    $t: () => {}
  }
})
const vm: any = (<any>wrapper).vm
describe('侧导航路由筛选', () => {
  it('测试路由表里边hidden： true的模块', () => {
    const children = mock.constantRouterHasFalse
    const result = vm.hasOneShowingChildren(children)
    expect(result).toBe(false)
  })
})

describe('侧导航路由筛选', () => {
  it('测试路由表里边hidden： false的模块', () => {
    const children = mock.constantRouterHasTrue
    const result = vm.hasOneShowingChildren(children)
    expect(result).toBe(true)
  })
})
