import Vue from 'vue'
import Element from 'element-ui'
import i18n from '@/lang'

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key: string, value: any) => i18n.t(key, value)
})