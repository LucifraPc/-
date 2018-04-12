import request from '@/utils/request'

export function getDataMiningInfo(taskParam) {
  return request({
    // http://bm.lubansoft.com/essencesale/queryMiningTaskByPage.htm
    baseURL: 'http://bm.lubansoft.com/essencesale/queryMiningTaskByPage.htm',
    // url: '/user/login',
    method: 'post',
    data: {
      taskParam
    }
  })
}
