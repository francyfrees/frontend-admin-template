import { ActionTree } from 'vuex'
import { asyncRouterMap, constantRouterMap } from '@/router'

import configCode from '@/config/configCode'
const { permissionMap } = configCode

import { permissionType } from '../mutation-types'
import { IPermissionState, IPermission } from '../interface'
const { SET_PERMISSION_CACHE, SET_PERMISSION, SET_ROUTERS } = permissionType

function filterAsyncRouter(
  asyncRouterMap: any[],
  _modelPermissionId: number[]
) {
  return asyncRouterMap.filter(route => {
    if (route.roleId === 0 || _modelPermissionId.indexOf(route.roleId) > -1) {
      return true
    } else {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, _modelPermissionId)
        if (route.children.length) {
          return true
        }
        return false
      }
      return false
    }
  })
}

function generatePermission(data: any[]) {
  const obj: IPermission = {
    modelPermission: [],
    modelOperationPermission: {}
  }
  data.forEach(item => {
    obj.modelPermission.push(item.id)
    if (
      (<any>permissionMap)[item.id] &&
      Array.isArray(item.child) &&
      item.child.length
    ) {
      obj.modelOperationPermission[
        (<any>permissionMap)[item.id]
      ] = item.child.map((ele: any) => ele.webname)
    }
  })
  return obj
}

const state: IPermissionState = {
  hasCachePermission: false,
  permission: {
    modelPermission: [],
    modelOperationPermission: {}
  },
  routers: constantRouterMap
}

const mutations = {
  [SET_PERMISSION_CACHE]: (
    state: IPermissionState,
    payload: { hasCachePermission: boolean }
  ) => {
    state.hasCachePermission = payload.hasCachePermission
  },
  [SET_PERMISSION]: (
    state: IPermissionState,
    payload: { permission: IPermission }
  ) => {
    state.permission = payload.permission
  },
  [SET_ROUTERS]: (state: IPermissionState, payload: { routers: any[] }) => {
    state.routers = constantRouterMap.concat(payload.routers)
  }
}

const actions: ActionTree<any, any> = {
  GetPermission({ commit }: any) {
    return new Promise(resolve => {
      const permission: IPermission = generatePermission([])
      commit({
        type: 'SET_PERMISSION_CACHE',
        hasCachePermission: true
      })
      commit({
        type: 'SET_PERMISSION',
        permission: permission
      })
      resolve(permission)
    })
  },
  GenerateRoutes(
    { commit }: any,
    { _permission }: { _permission: IPermission }
  ) {
    let accessedRouters = null
    return new Promise(resolve => {
      accessedRouters = filterAsyncRouter(
        asyncRouterMap,
        _permission.modelPermission
      )
      commit({
        type: 'SET_ROUTERS',
        routers: accessedRouters
      })
      resolve(accessedRouters)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
