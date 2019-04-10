import request from '@/utils/request'

export function fetchIdentifyPersonal(query: any): Promise<any> {
  return request({
    url: '/client/hostel/list',
    method: 'GET',
    params: query
  })
}

export function fetchIdentifyPersonalDetail(query: any): Promise<any> {
  return request({
    url: '/client/hostel/show',
    method: 'GET',
    params: query
  })
}

export function identifyPersonalAudit(data: any): Promise<any> {
  return request({
    // url: '/client/hostel/add',
    url: '/client/add',
    method: 'POST',
    data
  })
}
