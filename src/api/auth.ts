import request from '@/utils/request'
import { ISignIn, IRegister, IForget } from '@/interface/api/auth'

export function signIn(data: ISignIn): Promise<any> {
  return request({
    // url: '/client/login/login',
    url: '/client/signIn',
    method: 'POST',
    data
  })
}

export function register(data: IRegister): Promise<any> {
  return request({
    // url: '/client/login/login',
    url: '/client/register',
    method: 'POST',
    data
  })
}

export function resetPassword(data: IForget): Promise<any> {
  return request({
    // url: '/client/login/login',
    url: '/client/resetPassword',
    method: 'POST',
    data
  })
}

export function signOut(): Promise<any> {
  return request({
    // url: '/client/login/loginExit',
    url: '/client/signOut',
    method: 'GET'
  })
}

export function getHash(): Promise<any> {
  return request({
    // url: '/v1/admin/gethash',
    url: '/client/getHash',
    method: 'GET'
  })
}

export function getUserInfo(): Promise<any> {
  return request({
    url: '/client/getUserInfo',
    method: 'GET'
  })
}

export function sendCode(data: { [propName: string]: any }): Promise<any> {
  return request({
    // url: '/api/client/login/getTubeInfo',
    url: '/client/sendCode',
    method: 'POST',
    data
  })
}
