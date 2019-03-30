import '../../../init/initVueTpl'

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

import Router from 'vue-router'

const localVue = createLocalVue()
localVue.use(Router)
import Vue from 'vue'

Vue.use(Router)
const mockRoute = [
  {
    path: '/signIn',
    name: 'signIn',
    hidden: true
  }
]
const router: any = new Router({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: mockRoute
})

describe('顶部面包屑', () => {
  it('测试获取面包屑数据', () => {
    const wrapper = shallowMount(Breadcrumb, {
      localVue,
      router,
      mocks: {
        $t: () => {},
        $te: () => {},
        generateTitle: () => {}
      }
    })
    const vm: any = (<any>wrapper).vm
    const mockFn = jest.fn()
    wrapper.setMethods({
      hasDashboard: mockFn
    })
    vm.getBreadcrumb()
    expect(vm.hasDashboard).toHaveBeenCalled()
  })

  it('测试是否是首页', () => {
    const wrapper = shallowMount(Breadcrumb, {
      localVue,
      router,
      mocks: {
        $t: () => {},
        $te: () => {},
        generateTitle: () => {}
      }
    })
    const vm: any = (<any>wrapper).vm
    const first = {
      name: 'table'
    }
    wrapper.setData({
      resMatched: mockRoute
    })
    vm.hasDashboard(first, mockRoute)
    const result = [
      {
        path: '/dashboard',
        meta: { title: 'dashboard' }
      },
      ...mockRoute
    ]
    expect(vm.resMatched).toEqual(result)
  })

  it('测试是否是首页', () => {
    const wrapper = shallowMount(Breadcrumb, {
      localVue,
      router,
      mocks: {
        $t: () => {},
        $te: () => {},
        generateTitle: () => {}
      }
    })
    const vm: any = (<any>wrapper).vm
    const unitCb = jest.fn()
    vm.OnRouteChange(unitCb)
    expect(unitCb).toHaveBeenCalled()
  })
})
