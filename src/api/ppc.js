import request from '@/utils/request'

/* 数据挖掘  查询当前登录的用户的挖掘任务结果 */
export function getDataMiningInfo(taskParam) {
  return request({
    url: 'rest/dataming/task/list',
    method: 'post',
    data: taskParam
  })
}
/* 查看数据挖掘结果 */
export function getDataMiningResult(taskResultParam) {
  return request({
    url: 'rest/dataming/result/list',
    method: 'post',
    data:taskResultParam    
  })
}
/* 取消挖掘 */
export function cancleMining(miningId) {
  return request({
    url: 'rest/dataming/condition/' + miningId,
    method: 'delete',
  })
}
/* 导入挖掘信息*/
export function importMiningInfo(miningId) {
  return request({
    url: '/rest/dataming/task/import/' + miningId,
    method: 'get',
  })
}




/* 查看数据挖掘结果用户信息 */
export function getMiningResultUserInfo(param) {
  return request({
    baseURL: 'http://bm.lubansoft.com/essencesale/queryMiningResultUserInfo.htm',
    // url: '/user/login',
    method: 'post',
    data: param
  })
}
/* 查看数据挖掘结果有效套餐信息 */
export function getUserPackageServices(param) {
  return request({
    baseURL: 'http://bm.lubansoft.com/essencesale/queryUserPackageServices.htm',
    // url: '/user/login',
    method: 'post',
    data: param
  })
}
/* 查看数据挖掘结果云功能、BIM使用记录 */
export function getUserFunctionUsingLog(param) {
  return request({
    baseURL: 'http://bm.lubansoft.com/essencesale/queryUserFunctionUsingLog.htm',
    // url: '/user/login',
    method: 'post',
    data: param
  })
}
/* 查看数据挖掘结果跟进记录 */
export function getFollowUps(param) {
  return request({
    baseURL: 'http://bm.lubansoft.com/essencesale/queryFollowUps.htm',
    // url: '/user/login',
    method: 'post',
    data: param
  })
}
/* 添加跟进记录 */
export function addFollowUp(param) {
  return request({
    baseURL: 'http://bm.lubansoft.com/essencesale/addFollowUp.htm',
    // url: '/user/login',
    method: 'post',
    data: param
  })
}

/* 资源分配 */
/* 查询人员 */
export function getMembers(param) {
  return request({
    url: '/rest/common/members',
    method: 'post',
    data: [65,66]
  })
}
/* 获取可分配客户总数量 */
export function getCurToAllocateNum() {
  return request({
    url: '/rest/resAlloc/count/readyToAlloc',
    method: 'get'
  })
}
/*查询指定电销人员剩余可分配的人员数量*/
export function getRemainConut(username) {
  return request({
    url: '/rest/resAlloc/count/remain/' + username,
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
/* 提交按人员分配*/
export function handleAllocateDateByPeople(params) {
  return request({
    url: '/rest/resAlloc/submit/byPeople',
    method: 'post',
    data: params
  })
}
/* 按照人员资源列表查询*/
export function getAllocatedByResourceList(param) {
  return request({
    url: '/rest/resAlloc/list/byRes',
    method: 'post',
    data: param
  })
}
/* 提交按资源分配*/
export function handleAllocateDateByResource(params) {
  return request({
    url: '/rest/resAlloc/submit/byRes',
    method: 'post',
    data: params
  })
}
