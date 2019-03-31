interface IState {
    app: {
        sidebar: {
            opened: boolean;
            withoutAnimation: boolean;
        };
        sidebarStatus: boolean;
        device: string;
        isLoading: boolean;
        language: string;
        theme: string;
        navWidth: number;
        varyWidth: number;
    };
    tagsView: {
        visitedViews: any[];
        cachedViews: any[];
    };
    user: {
        adminName: string;
        adminAvatar: string;
        rolesId: string | number;
    };
    permission: {
        hasCachePermission: boolean;
        permission: {
            modelPermission: number[];
            modelOperationPermission: {
                [propName: string]: string[];
            };
        };
        routers: any[];
    };
    errorLog: {
        logs: any[];
    };
}

const getters = {
  sidebar: (state: any) => state.app.sidebar,
  sidebarStatus: (state: any) => state.app.sidebarStatus,
  language: (state: any) => state.app.language,
  isLoading: (state: any) => state.app.isLoading,
  device: (state: any) => state.app.device,
  theme: (state: any) => state.app.theme,
  navWidth: (state: any) => state.app.navWidth,
  varyWidth: (state: any) => state.app.varyWidth,

  visitedViews: (state: any) => state.tagsView.visitedViews,
  cachedViews: (state: any) => state.tagsView.cachedViews,

  adminAvatar: (state: any) => state.user.adminAvatar,
  adminName: (state: any) => state.user.adminName,

  hasCachePermission: (state: any) => state.permission.hasCachePermission,
  permission: (state: any) => state.permission.permission,
  permissionRouters: (state: any) => state.permission.routers,

  errorLogs: (state: any) => state.errorLog.logs
}
export default getters
