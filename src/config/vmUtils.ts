interface IRouterParams {
  [propName: string]: any
}

export default function install(Vue: any) {
  Vue.prototype._ = {
    HTTP_RESPONSE_STATUS_SUCCESS: 1,
    HTTP_RESPONSE_STATUS_ERROR: 0
  }
  Vue.prototype.vmUtils = {
    _routerNext(routerName: string, routerParams?: IRouterParams) {
      if (routerParams) {
        return {
          name: routerName,
          params: routerParams
        }
      } else {
        return {
          name: routerName
        }
      }
    }
  }
}
