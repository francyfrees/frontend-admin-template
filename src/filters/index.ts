import config from '@/lang/zh'
const _ = config.filters

const statusTagObj: { [propName: string]: any } = {
  ableStatus: {
    // 启用禁用
    '0': 'danger',
    '1': 'success'
  },
  shelveStatus: {
    // 上架、下架
    '0': 'danger',
    '1': 'success'
  },
  hostelAuditState: {
    // 审核状态
    '0': 'danger',
    '1': 'success',
    '2': 'danger',
    '3': 'info'
  },
  readStatus: {
    '0': 'danger',
    '1': 'success'
  }
}
const statusDataObj: { [propName: string]: any } = {
  sex: {
    '0': _.male,
    '1': _.female
  },
  ableStatus: {
    '0': _.disable,
    '1': _.enable
  },
  hostelAuditState: {
    // 民宿审核状态
    '0': _.disable,
    '1': _.enable,
    '2': _.auditBack,
    '3': _.auditWait
  },
  approveState: {
    '0': _.notCertified,
    '1': _.verified
  },
  null: {
    '0': _.fewerParameters,
    '1': _.fewerParameters
  }
}

export function statusFilterByTag(status: string | number, type: string = '') {
  if (
    type === null ||
    typeof status === 'undefined' ||
    status === '' ||
    status === null
  ) {
    return
  }
  return statusTagObj[type][status]
}

export function statusFilterConverter(
  status: string | number,
  type: string = ''
) {
  if (
    type === null ||
    typeof status === 'undefined' ||
    status === '' ||
    status === null
  ) {
    return
  }
  return statusDataObj[type][status]
}

export function parseTime(time: number, cFormat: any) {
  let timer
  if (arguments.length === 0) {
    return null
  }

  if (String(time).length === 10) {
    timer = Number(time) * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof timer === 'object') {
    date = timer
  } else {
    date = new Date(time)
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(
    /{(y|m|d|h|i|s|a)+}/g,
    (result: any, key: any) => {
      let value = formatObj[key]
      if (key === 'a') {
        return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    }
  )
  return time_str
}

export function formatTime(time: number, option: any) {
  // time = +time * 1000
  const timer = Number(time) * 1000
  const d: any = new Date(timer)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getFullYear() +
      '年' +
      (d.getMonth() + 1) +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function timeToTimestamp(time: number) {
  return new Date(time).getTime() / 1000
}
