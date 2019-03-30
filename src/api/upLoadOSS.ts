import request from '@/utils/request'

export function getAliOSS(): Promise<any> {
  return request({
    url: '/client/oss',
    method: 'GET'
  })
}
