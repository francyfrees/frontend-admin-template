import faker from 'faker'
import layout from '@/views/layout/layout.vue'
const randomBoolean = faker.random.boolean()
export default {
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
  },
  randomBoolean,
  constantRouterHasFalse: [
    {
      path: '/aaa',
      component: layout,
      redirect: '/aaa/add',
      meta: { title: 'aaa' },
      hidden: false,
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
  ],
  constantRouterHasTrue: [
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
}