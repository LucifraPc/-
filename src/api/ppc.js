import request from '@/utils/request'

/* 数据挖掘 */
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
/* 资源分配 */
/* 查询人员 */
export function getMembers(param) {
  return request({
    url: '/rest/common/members',
    method: 'post',
    data: [64,65]
  })
}
/* 获取可分配客户总数量 */
export function getCurToAllocateNum() {
  return request({
    url: '/rest/resAlloc/count/readyToAlloc',
    method: 'get'
  })
}
/* 按照人员分配列表查询*/
export function getAllocatedByPeopleList(param) {
  return request({
    url: '/rest/resAlloc/list/byPeople',
    method: 'post',
    data: param
  })
}
export function getAllocatedByResourceList(param) {
  return request({
    url: '/rest/resAlloc/list/byRes',
    method: 'post',
    data: param
  })
}
/* 提交按人员分配*/
export function handleAllocateDateByPeople(params) {
  return request({
    url: '/rest/resAlloc/submit/byPeople',
    method: 'post',
    data: params
  })
}
