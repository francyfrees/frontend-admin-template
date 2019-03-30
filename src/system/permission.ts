import router from '../router'
import store from '../store'
import { Route } from 'vue-router'

import configCode from '@/config/configCode'
const { HTTP_RESPONSE_STATUS_ERROR } = configCode

function generateRoutes(next: Function, to: Route) {
  if (!store.getters.hasCachePermission) {
    store
      .dispatch('permission/GetPermission')
      .then((_permission: Ajax.AxiosResponse) => {
        store
          .dispatch('permission/GenerateRoutes', { _permission })
          .then(Routers => {
            router.addRoutes(Routers)
            next({ ...to, replace: true })
          })
      })
  } else {
    next()
  }
}

router.beforeEach((to: Route, from: Route, next: Function) => {
  store.dispatch('app/pageLoading', true)
  store.dispatch('user/GetUserInfo').then((response: Ajax.AxiosResponse) => {
    if (
      parseInt(response.data.status as string, 10) ===
      HTTP_RESPONSE_STATUS_ERROR
    ) {
      if (to.path !== '/signIn') next({ path: '/signIn' })
      else next()
    } else {
      if (to.path === '/signIn') {
        next({ path: '/' })
      } else {
        generateRoutes(next, to)
      }
    }
  })
})

router.afterEach(() => {
  store.dispatch('app/pageLoading', false)
})
