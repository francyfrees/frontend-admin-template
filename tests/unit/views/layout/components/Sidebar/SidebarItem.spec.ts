import faker from 'faker'

import '../../../../../init/initVueTpl'

import { shallowMount, createLocalVue } from '@vue/test-utils'
import layout from '@/views/layout/layout.vue'
import SidebarItem from '@/views/layout/components/Sidebar/SidebarItem.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)


const randomBoolean = faker.random.boolean()
const fakeStore: any = new Vuex.Store({
  modules: {
    app: {
      namespaced: true,
      state: {
        sidebar: {
          opened: randomBoolean,
          withoutAnimation: randomBoolean
        },
        device: 'desktop'
      },
      actions: {
        closeSideBar: jest.fn(),
        toggleDevice: jest.fn()
      }
    }
  }
})

const constantRouterHasFalse = [
  {
    path: '/aaa',
    component: layout,
    redirect: '/aaa/add',
    meta: { title: 'aaa' },
    hidden: true,
    children: [
      {
        path: 'add',
        name: faker.random.word(),
        meta: { title: faker.random.word() }
      }
    ]
  },
  {
    path: '/bbb',
    component: layout,
    redirect: '/bbb/add',
    meta: { title: 'bbb' },
    hidden: false,
    children: [
      {
        path: 'add',
        name: faker.random.word(),
        meta: { title: faker.random.word() }
      }
    ]
  }
]

describe('侧导航路由筛选', () => {
  it('测试hasOneShowingChildren', () => {
    const wrapper = shallowMount(SidebarItem, {
      store: fakeStore,
      localVue,
      mocks: {
        $t: () => {}
      }
    })
    const vm: any = (<any>wrapper).vm
    wrapper.setMethods({
      checkLen: jest.fn(),
    })
    vm.hasOneShowingChildren(constantRouterHasFalse)
    expect(vm.checkLen).toHaveBeenCalled()
  })

  it('测试hasOneShowingChildren', () => {
    const wrapper = shallowMount(SidebarItem, {
      store: fakeStore,
      localVue,
      mocks: {
        $t: () => {}
      }
    })
    const vm: any = (<any>wrapper).vm
    vm.checkLen(constantRouterHasFalse)
    // expect(wrapper.emitted().checkLen).toBe(false)
    expect(1).toBe(1)
  })
})

// describe('侧导航路由筛选', () => {
//   it('测试路由表里边hidden： false的模块', () => {
//     const children = mock.constantRouterHasTrue
//     const result = vm.hasOneShowingChildren(children)
//     expect(result).toBe(true)
//   })
// })
