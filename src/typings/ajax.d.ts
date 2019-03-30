declare namespace Ajax {
  export interface AxiosResponse {
    data: AjaxResponse;
  }

  export interface AjaxResponse {
    [propName: string]: any;
  }
}
