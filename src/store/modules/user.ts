import { ActionTree } from 'vuex'
import { signOut } from '@/api/auth'

import { userType } from '../mutation-types'
import { IUserState } from '../interface'
import configCode from '@/config/configCode'

const { HTTP_RESPONSE_STATUS_SUCCESS } = configCode

const { SET_ADMIN_AVATAR, SET_ADMIN_NAME } = userType

const state: IUserState = {
  adminName: '',
  adminAvatar: ''
}

const mockRes = {
  data: {
    status: 1,
    data: {
      name: '系统管理员',
      avatar: ''
    }
  }
}

const mutations = {
  [SET_ADMIN_AVATAR](state: IUserState, payload: { adminAvatar: string }) {
    state.adminAvatar = payload.adminAvatar
  },
  [SET_ADMIN_NAME](state: IUserState, payload: { adminName: string }) {
    state.adminName = payload.adminName
  }
}

const actions: ActionTree<any, any> = {
  GetUserInfo({ commit }: any) {
    return new Promise(resolve => {
      const data = mockRes.data.data
      commit({
        type: 'SET_ADMIN_NAME',
        adminName: data.name
      })
      commit({
        type: 'SET_ADMIN_AVATAR',
        adminAvatar: data.avatar
      })
      return resolve(mockRes)
    })
  },

  SignOut() {
    return new Promise((resolve, reject) => {
      signOut().then(
        (response: any) => {
          const status = parseInt(response.data.status)
          if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
            resolve()
          }
          resolve()
        },
        (error: any) => {
          reject(error)
        }
      )
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
