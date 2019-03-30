import faker from 'faker'
import Layout from '@/views/layout/Layout.vue'
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
  constantRouter: [
    {
      path: '',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          name: 'dashboard',
          meta: { title: 'dashboard', icon: 'icon-dashboard', noCache: true }
        }
      ]
    }
  ],
  constantEmptyRouter: []
}