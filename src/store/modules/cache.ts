import { MutationTree } from 'vuex'

import { cacheType } from '../mutation-types'
import { ICacheState, ISetCacheViewData } from '../interface'

const { SET_CACHE_VIEW_DATA } = cacheType

const state: ICacheState = {
  cacheData: {}
}

export const mutations: MutationTree<any> = {
  [SET_CACHE_VIEW_DATA](state: ICacheState, payload: ISetCacheViewData) {
    if (state.cacheData[payload.viewName]) {
      state.cacheData[payload.viewName] = {
        [payload.viewType]: {
          ...state.cacheData[payload.viewName][payload.viewType],
          ...payload.cacheData
        }
      }
    } else {
      state.cacheData[payload.viewName] = {
        [payload.viewType]: payload.cacheData
      }
    }
  }
}

export const actions = {
  SetCacheViewData(
    { commit }: any,
    { viewName, viewType, cacheData }: ISetCacheViewData
  ) {
    commit({
      type: 'SET_CACHE_VIEW_DATA',
      cacheData,
      viewType,
      viewName
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
