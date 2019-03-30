import { ActionTree } from 'vuex'
import { errorLogType } from '../mutation-types'
import { IErrorLogState } from '../interface'

const { ADD_ERROR_LOG } = errorLogType

const state: IErrorLogState = {
  logs: []
}

const mutations = {
  [ADD_ERROR_LOG](state: IErrorLogState, payload: any) {
    state.logs.push(payload.log)
  }
}

const actions: ActionTree<any, any> = {
  addErrorLog({ commit }: any, log: any) {
    commit({
      type: 'ADD_ERROR_LOG',
      log: log
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
