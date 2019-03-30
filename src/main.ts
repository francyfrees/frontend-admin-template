import '@/hooks'

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import i18n from '@/lang'
import store from '@/store/index'
import FastClick from 'fastclick'

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import '@/system/permission'
import '@/registerServiceWorker'

import * as filters from '@/filters' // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, (<any>filters)[key])
})

import vmUtils from '@/config/vmUtils'
Vue.use(vmUtils)

import Element from 'element-ui'
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key: string, value: any) => i18n.t(key, value)
})

Vue.config.productionTip = false

// 兼容毒瘤ios的300ms延迟问题
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      ;(FastClick as any).attach(document.body)
    },
    false
  )
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
