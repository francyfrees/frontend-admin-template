export interface IAppState {
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
}

export interface ICacheState {
    cacheData: {
        [propName: string]: any;
    };
}

export interface ISetCacheViewData {
    viewName: string;
    viewType: string;
    cacheData: {
        [propName: string]: any;
    };
}

export interface IErrorLogState {
    logs: any[];
}

export interface IPermissionState {
    hasCachePermission: boolean;
    permission: {
        modelPermission: number[];
        modelOperationPermission: {
            [propName: string]: string[];
        };
    };
    routers: any[];
}

export interface IPermission {
    modelPermission: number[];
    modelOperationPermission: {
        [propName: string]: string[];
    };
}

export interface ISystemState {
    mark: string;
}

export interface ITagsViewState {
    visitedViews: any[];
    cachedViews: any[];
}

export interface IUserState {
    adminName: string;
    adminAvatar: string;
}