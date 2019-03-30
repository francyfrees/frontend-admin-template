import request from '@/utils/request'

export function fetchHostel(query: any): Promise<any> {
  return request({
    url: '/client/hostel/list',
    method: 'GET',
    params: query
  })
}

export function fetchHostelDetail(query: any): Promise<any> {
  return request({
    url: '/client/hostel/show',
    method: 'GET',
    params: query
  })
}

export function hostelAdd(data: any): Promise<any> {
  return request({
    // url: '/client/hostel/add',
    url: '/client/add',
    method: 'POST',
    data
  })
}

export function hostelEdit(data: any): Promise<any> {
  return request({
    // url: '/client/hostel/edit',
    url: '/client/edit',
    method: 'POST',
    data
  })
}
