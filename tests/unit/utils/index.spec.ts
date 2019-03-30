import '../../init/initVueTpl'
import {
  deepClone,
  rename,
  validateImagesError,
  validateConstructor
} from '@/utils/index'

import configPattern from '@/config/configPattern'
const { _regexp_password } = configPattern

// class GenerateObj {
//   string: string;
//   boolean: boolean;
//   number: number;
//   array: any[];
//   fn: Function;
//   object: { [propName: string]: any };
//   constructor(options: { [propName: string]: any }) {
//     this.string = options.string
//     this.boolean = options.boolean
//     this.number = options.number
//     this.array = options.array
//     this.fn = options.fn
//     this.object = options.object
//   }
// }

// class Soldier {
//   baba: string
//   constructor() {
//     this.baba = 'qml'
//   }
// }

function GenerateObj(options: { [propName: string]: any }): any {
  this.string = options.string
  this.boolean = options.boolean
  this.number = options.number
  this.array = options.array
  this.fn = options.fn
  this.object = options.object
}

function Soldier(): any {
  this.name = 'qml'
}

describe('工具类库', () => {
  const origin: any = {
    string: 'liu',
    boolean: true,
    number: 0,
    array: [0, 1, 2, 3],
    fn: function add() {
      return '测试函数'
    },
    object: {
      string: 'liu',
      boolean: true,
      number: 0,
      array: [0, 1, 2, 3]
    }
  }
  it('测试deepClone', () => {
    const target = {}
    const res = deepClone(origin, target)
    expect(res).toEqual(origin)
  })

  // it('测试deepClone 原数据有继承', () => {
  //   GenerateObj.prototype = Object.create(Soldier.prototype)
  //   const obj: any = new GenerateObj(origin)
  //   console.log(obj)
  //   const target = {}
  //   const res = deepClone(obj, target)
  //   expect(res).toEqual(origin)
  // })
})

describe('工具类库', () => {
  it('测试rename', () => {
    const file = {
      lastModified: 1526385883814,
      name: 'photo.jpeg',
      size: 17003,
      type: 'image/jpeg',
      uid: 1552639325705,
      webkitRelativePath: ''
    }
    const res = rename(file)
    expect(res).not.toEqual(12)
  })
})

describe('工具类库', () => {
  it('测试validateImagesError 上传文件类型不符合规格', () => {
    const file = {
      lastModified: 1526385883814,
      name: 'photo.jpeg',
      size: 17003,
      type: 'image/pdf',
      uid: 1552639325705,
      webkitRelativePath: ''
    }
    const res = validateImagesError(file)
    expect(res).toBe(true)
  })

  it('测试validateImagesError 上传文件大小不符合规格', () => {
    const file = {
      lastModified: 1526385883814,
      name: 'photo.jpeg',
      size: 1270303,
      type: 'image/jpg',
      uid: 1552639325705,
      webkitRelativePath: ''
    }
    const res = validateImagesError(file)
    expect(res).toBe(true)
  })

  it('测试validateImagesError 上传文件符合规格', () => {
    const file = {
      lastModified: 1526385883814,
      name: 'photo.jpeg',
      size: 17003,
      type: 'image/jpg',
      uid: 1552639325705,
      webkitRelativePath: ''
    }
    const res = validateImagesError(file)
    expect(res).toBe(false)
  })
})

describe('工具类库', () => {
  it('测试validateConstructor 验证value不通过', () => {
    const data = {
      emptyError: '请输入民宿名称'
    }
    const res = validateConstructor(data)
    const rule = {
      field: 'name',
      fullField: 'name',
      required: true,
      type: 'string'
    }
    const value = ''
    const cb = jest.fn()
    res(rule, value, cb)
    expect(cb).toHaveBeenCalled()
  })

  it('测试validateConstructor 验证value长度不通过', () => {
    const data = {
      emptyError: '请输入民宿名称',
      min: 4,
      max: 10
    }
    const res = validateConstructor(data)
    const rule = {
      field: 'name',
      fullField: 'name',
      required: true,
      type: 'string'
    }
    const value = '你'
    const cb = jest.fn()
    res(rule, value, cb)
    expect(cb).toHaveBeenCalled()
  })

  it('测试validateConstructor 验证正则表达式不通过', () => {
    const data = {
      emptyError: '密码不能为空',
      regExp: _regexp_password,
      regExpError: '密码为6-20位数字与字母组合'
    }
    const res = validateConstructor(data)
    const rule = {
      field: 'name',
      fullField: 'name',
      required: true,
      type: 'string'
    }
    const value = '强明亮'
    const cb = jest.fn()
    res(rule, value, cb)
    expect(cb).toHaveBeenCalled()
  })

  it('测试validateConstructor 验证通过', () => {
    const data = {
      emptyError: '密码不能为空',
      regExp: _regexp_password,
      regExpError: '密码为6-20位数字与字母组合'
    }
    const res = validateConstructor(data)
    const rule = {
      field: 'name',
      fullField: 'name',
      required: true,
      type: 'string'
    }
    const value = 'geini457.3'
    const cb = jest.fn()
    res(rule, value, cb)
    expect(cb).toHaveBeenCalled()
  })
})
