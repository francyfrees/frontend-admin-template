/**
 * @param
 * page 第几页
 * limit 每页数据量
 * search 检索字段
 */
export interface ISignIn {
    page: number;
    limit: number;
    search: string;
}