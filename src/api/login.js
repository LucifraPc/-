import request from '@/utils/request'

let base = global.baseHost;



export function login(loginForm) {
  return request({
    url: base+'rest/login/',
    method: 'post',
    data: loginForm
  })
}
export function changePass(param) {
  return request({
    url: base+'rest/user/passwd',
    method: 'post',
    data: param
  })
}
export function getInfo(token) {
  return request({
    url: base+'/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: base+'rest/login/loginout',
    method: 'get'
  })
}

