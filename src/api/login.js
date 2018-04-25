import request from '@/utils/request'

export function login(loginForm) {
  return request({
    url: 'rest/login/',
    method: 'post',
    data: loginForm
  })
}
export function changePass(param) {
  return request({
    url: 'rest/user/passwd',
    method: 'post',
    data: param
  })
}
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'rest/login/loginout',
    method: 'get'
  })
}

