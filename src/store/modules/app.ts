import { MutationTree } from 'vuex'
import Cookies from 'js-cookie'

import { appType } from '../mutation-types'
import { IAppState } from '../interface'

const {
  TOGGLE_SIDEBAR,
  SIDEBAR_STATUS,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  TOGGLE_DEVICE,
  PAGE_LOADING,
  SET_LANGUAGE,
  SET_THEME,
  SET_NAV_WIDTH,
  SET_VARY_WIDTH
} = appType

const state: IAppState = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') !== 'off',
    withoutAnimation: false
  },
  sidebarStatus: true,
  device: 'desktop',
  isLoading: false,
  language: Cookies.get('language') || 'zh',
  theme: Cookies.get('clientTheme') || 'bee',
  navWidth: 180,
  varyWidth: 0
}

export const mutations: MutationTree<any> = {
  [TOGGLE_SIDEBAR](state: IAppState) {
    if (state.sidebarStatus) {
      // 开启侧导航
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 'off') // on=开启 off=关闭
      } else {
        Cookies.set('sidebarStatus', 'on')
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    } else {
      Cookies.set('sidebarStatus', 'on')
    }
  },
  [SIDEBAR_STATUS](state: IAppState, payload: { open: boolean }) {
    state.sidebarStatus = payload.open
  },
  [OPEN_SIDEBAR](state: IAppState) {
    state.sidebar.opened = true
    state.sidebar.withoutAnimation = false
  },
  [CLOSE_SIDEBAR](state: IAppState, payload: { withoutAnimation: boolean }) {
    Cookies.set('sidebarStatus', 'off')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = payload.withoutAnimation
  },
  [TOGGLE_DEVICE](state: IAppState, payload: { device: string }) {
    state.device = payload.device
  },
  [PAGE_LOADING](state: IAppState, payload: { isLoading: boolean }) {
    state.isLoading = payload.isLoading
  },
  [SET_LANGUAGE](state: IAppState, payload: { language: string }) {
    state.language = payload.language
    Cookies.set('language', payload.language)
  },
  [SET_THEME](state: IAppState, payload: { theme: string }) {
    state.theme = payload.theme
    Cookies.set('clientTheme', payload.theme)
  },
  [SET_NAV_WIDTH](state, payload) {
    state.navWidth = 180 + payload.navWidth
  },
  [SET_VARY_WIDTH](state: IAppState, payload: { varyWidth: number }) {
    state.varyWidth = payload.varyWidth
  }
}

export const actions = {
  toggleSideBar({ commit }: any) {
    commit('TOGGLE_SIDEBAR')
  },
  sideBarStatus({ commit }: any, { open }: { open: boolean }) {
    commit({
      type: 'SIDEBAR_STATUS',
      open: open
    })
  },
  closeSideBar(
    { commit }: any,
    { withoutAnimation }: { withoutAnimation: boolean }
  ) {
    commit({
      type: 'CLOSE_SIDEBAR',
      withoutAnimation: withoutAnimation
    })
  },
  openSideBar({ commit }: any) {
    commit('OPEN_SIDEBAR')
  },
  toggleDevice({ commit }: any, device: string) {
    commit({
      type: 'TOGGLE_DEVICE',
      device: device
    })
  },
  pageLoading({ commit }: any, isLoading: boolean) {
    commit({
      type: 'PAGE_LOADING',
      isLoading: isLoading
    })
  },
  setLanguage({ commit }: any, language: string) {
    commit({
      type: 'SET_LANGUAGE',
      language: language
    })
  },
  setTheme({ commit }: any, theme: string) {
    commit({
      type: 'SET_THEME',
      theme: theme
    })
  },
  setNavWidth({ commit }: any, navWidth: number) {
    commit({
      type: 'SET_NAV_WIDTH',
      navWidth: navWidth
    })
  },
  setVaryWidth({ commit }: any, varyWidth: number) {
    commit({
      type: 'SET_VARY_WIDTH',
      varyWidth: varyWidth
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
