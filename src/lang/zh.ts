import filters from './model/filters'

// model
import route from './model/route'
import auth from './model/auth'

export default {
  operation: {
    operation: '操作',
    view: '查看',
    submit: '提交',
    add: '新增',
    delete: '删除',
    checkAll: '全选',
    edit: '编辑',
    reEdit: '重新编辑',
    disable: '禁用',
    enable: '启用',
    approve: '通过',
    reject: '驳回',
    top: '置顶',
    cancelTop: '取消置顶',
    agreed: '同意',
    noAgreed: '不同意',
    shelves: '上架',
    unShelves: '下架',
    open: '打开',
    close: '关闭'
  },
  // 加载
  loading: {
    loadingText: '加载中...'
  },
  // 菜单
  headerBar: {
    logo: '后台管理平台',
    signOut: '退出',
    dashboard: '首页',
    personalCenter: '个人中心',
    todoList: '待办事项',
    refresh: '刷新页面',
    screenfull: '全屏',
    theme: '换肤',
    rose: '红色',
    jack: '绿色',
    bee: '金色'
  },
  form: {
    submit: '提交',
    change: '修改',
    confirm: '确定',
    close: '关闭',
    cancel: '取消'
  },
  table: {
    number: '编号',
    noImg: '暂无图片'
  },
  tagsView: {
    dashboard: '首页',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  forward: '敬请期待',
  filters,
  route,

  auth
}
