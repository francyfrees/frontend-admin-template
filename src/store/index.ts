import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import cache from './modules/cache'
import errorLog from './modules/errorLog'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    cache,
    errorLog,
    tagsView,
    permission,
    user
  },
  getters
})

export default store
