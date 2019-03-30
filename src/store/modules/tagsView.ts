import { ActionTree } from 'vuex'
import { tagsViewType } from '../mutation-types'
import { ITagsViewState } from '../interface'
const {
  ADD_VISITED_VIEWS,
  DEL_VISITED_VIEWS,
  DEL_OTHERS_VIEWS,
  DEL_ALL_VIEWS
} = tagsViewType

export const state: ITagsViewState = {
  visitedViews: [],
  cachedViews: []
}

export const mutations = {
  [ADD_VISITED_VIEWS](state: ITagsViewState, payload: { view: any }) {
    const path = payload.view
    if (state.visitedViews.some(v => v.path === path.path)) {
      return
    }
    if (path.name === 'dashboard') {
      return
    }
    state.visitedViews.push({
      name: path.name,
      path: path.path,
      title: path.meta.title || 'no-name',
      icon: path.meta.icon || ''
    })
    if (!path.meta.noCache) {
      state.cachedViews.push(path.name)
    }
  },
  [DEL_VISITED_VIEWS](state: ITagsViewState, payload: { view: any }) {
    const path = payload.view
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === path.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
    for (const i of state.cachedViews) {
      if (i === path.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },
  [DEL_OTHERS_VIEWS](state: ITagsViewState, payload: { view: any }) {
    const path = payload.view
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === path.path) {
        state.visitedViews = state.visitedViews.slice(i, i + 1)
        break
      }
    }
    for (const i of state.cachedViews) {
      if (i === path.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews = state.cachedViews.slice(index, i + 1)
        break
      }
    }
  },
  [DEL_ALL_VIEWS](state: ITagsViewState) {
    state.visitedViews = []
    state.cachedViews = []
  }
}

export const actions: ActionTree<any, any> = {
  addVisitedViews({ commit }: any, view: any) {
    commit({
      type: 'ADD_VISITED_VIEWS',
      view: view
    })
  },
  delVisitedViews({ commit, state }: any, view: any) {
    return new Promise(resolve => {
      commit({
        type: 'DEL_VISITED_VIEWS',
        view: view
      })
      resolve([...state.visitedViews])
    })
  },
  delOthersViews({ commit, state }: any, view: any) {
    return new Promise(resolve => {
      commit({
        type: 'DEL_OTHERS_VIEWS',
        view: view
      })
      resolve([...state.visitedViews])
    })
  },
  delAllViews({ commit, state }: any) {
    return new Promise(resolve => {
      commit('DEL_ALL_VIEWS')
      resolve([...state.visitedViews])
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
