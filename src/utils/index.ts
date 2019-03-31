import * as elementUi from 'element-ui'

import moment from 'moment'

import { IArguments, IOrigin } from '@/interface/utils/index'

import configPrompt from '@/config/configPrompt'
const {
  ER_UPLOAD_IMG_TYPE,
  ER_UPLOAD_IMG_SIZE
} = configPrompt

/**
 * 操作框
 * @param
 * content: 内容
 * title: 标题
 * callback: 回调函数
 */
// export function openConfirm(
//   content: string,
//   title: string,
//   callback: () => any
// ): void {
//   elementUi.MessageBox.confirm(content, title, {
//     confirmButtonText: SUBMIT,
//     confirmButtonClass: 'is-plain el-button--success el-button--medium',
//     cancelButtonText: CANCEL,
//     cancelButtonClass: 'is-plain el-button--medium',
//     type: 'warning'
//   })
//     .then(() => {
//       callback()
//     })
//     .catch(() => {
//       elementUi.Message({
//         type: 'info',
//         message: CANCEL_OPERATION
//       })
//     })
// }

/**
 * 对话框
 * @param
 * content: 内容
 * title: 标题
 * callback: 回调函数
 */
// export function openPrompt(
//   content: string,
//   title: string,
//   callback: (value: string) => any
// ): void {
//   elementUi.MessageBox.prompt(content, title, {
//     inputType: 'textarea',
//     confirmButtonText: SUBMIT,
//     confirmButtonClass: 'is-plain el-button--success el-button--medium',
//     cancelButtonText: CANCEL,
//     cancelButtonClass: 'is-plain el-button--medium',
//     inputPattern: /\S/g,
//     inputErrorMessage: title
//   })
//     .then(({ value }) => {
//       callback(value)
//     })
//     .catch(() => {
//       elementUi.Message({
//         type: 'info',
//         message: configPrompt.CANCEL_OPERATION
//       })
//     })
// }

/**
 * 深拷贝
 * @param
 * origin: 原始数据
 * target: 目标容器  [] | {}
 */
export function deepClone(origin: any, target: IOrigin = {}): any {
  const toStr = Object.prototype.toString
  const arrStr = '[object Array]'
  for (const prop in origin) {
    if (origin.hasOwnProperty(prop)) {
      if (origin[prop] !== 'null' && typeof origin[prop] === 'object') {
        target[prop] = toStr.call(origin[prop]) === arrStr ? [] : {}
        deepClone(origin[prop], target[prop])
      } else {
        target[prop] = origin[prop]
      }
    }
  }
  return target
}

export function rename(file: any) {
  const curr = moment()
    .format('YYYYMMDD')
    .toString()
  const prefix = moment(file.lastModified)
    .format('HHmmss')
    .toString()
  const suffix = file.name.substring(file.name.lastIndexOf('.'))
  const key = encodeURI(`${curr}${prefix}${suffix}`)
  return key
}

export function validateImagesError(file: any) {
  const [isJPG, isJPEG, isPNG, isMx1M] = [
    file.type === 'image/jpg',
    file.type === 'image/jpeg',
    file.type === 'image/png',
    file.size / 1024 / 1024 < 1
  ]
  if (!(isJPG || isJPEG || isPNG)) {
    elementUi.Message({
      message: ER_UPLOAD_IMG_TYPE,
      type: 'error'
    })
    return true
  } else if (!isMx1M) {
    elementUi.Message({
      message: ER_UPLOAD_IMG_SIZE,
      type: 'error'
    })
    return true
  } else {
    return false
  }
}

/**
 * 表单验证
 * @param argums type obj
 * @property
 * min: 最小长度
 * max: 最大长度
 * regExp: 正则
 * emptyError: 空值错误提醒
 * scopedError: 范围错误提醒
 * regExpError: 正则匹配错误提醒
 */
export function validateConstructor(
  argums: IArguments
): (rule: any, value: any, callback: any) => any {
  return (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value.length === 0) {
      callback(new Error(argums.emptyError))
    } else if (
      typeof argums.min !== 'undefined' &&
      typeof argums.max !== 'undefined' &&
      (value.length < argums.min || value.length > argums.max)
    ) {
      callback(new Error(argums.scopedError))
    } else if (
      typeof argums.regExp !== 'undefined' &&
      !argums.regExp.test(value)
    ) {
      callback(new Error(argums.regExpError))
    } else {
      callback()
    }
  }
}

export function errMsg(response: Ajax.AxiosResponse) {
  try {
    this.$message({
      message: response.data.data.detail,
      type: 'error'
    })
  } catch (error) {
    elementUi.Message({
      message: '系统错误',
      type: 'error'
    })
  }
}
