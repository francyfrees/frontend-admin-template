import { transformData } from '@/utils'

const mockData = {
  id: 1,
  comment: '这是评论',
  info: {
    id: 2,
    title: '模型',
    description: '这个是一个typescript数据模型'
  },
  list: [
    {
      name: 'father',
      sex: '男',
      age: 48,
      love: 'papa'
    },
    {
      name: 'mother',
      sex: '女',
      age: 44
    },
    {
      name: 'grandfather',
      sex: '男',
      age: 70
    }
  ]
}

const templateDown = {
  id: 'id',
  name: 'title',
  desc: 'description'
}

const templateDowns = {
  name: 'name',
  sex: 'sex',
  age: 'age',
  love: 'love'
}

const templateTop = {
  id: 'id',
  content: 'comment',
  info: {
    key: 'info',
    template: templateDown
  },
  list: ['list', templateDowns]
}

export enum EStatus {
  BAN = 0,
  OPEN = 1,
  HIDE = 2,
  NOTBUY = 3
}

export class BaseModel {
  public id!: string
  public content!: string
  public info!: typeof templateDown
  public list!: typeof templateDowns[]
  constructor() {
    this._initData()
  }
  public _initData() {
    this.id = ''
    this.content = ''
    this.info = {
      id: '',
      name: '',
      desc: ''
    }
    this.list = []
  }
  public setData(data: BaseModel): void {
    if (data) {
      for (let e in this) {
        if ((<Object>data).hasOwnProperty(e)) {
          this[e] = (<any>data)[e]
        }
      }
    }
  }
}

const transData = transformData(mockData, templateTop)
const base = new BaseModel()
base.setData(transData)
console.log(base)


// 账号： 手机哈
// 密码： 6-30位且必须包含数字和字母