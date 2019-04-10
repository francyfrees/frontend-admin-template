import Layout from '@/views/layout/Layout.vue'

import configRouteName from '@/config/configRouteName'
const { signIn, page404, page401, dashboard } = configRouteName

export default [
  {
    path: '/signIn',
    component: () => import('@/views/auth/signIn.vue'),
    name: signIn,
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404.vue'),
    name: page404,
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401.vue'),
    name: page401,
    hidden: true
  },

  // 首页
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: dashboard,
        meta: { title: 'dashboard', icon: 'icon-dashboard', noCache: true }
      }
    ]
  }
]
