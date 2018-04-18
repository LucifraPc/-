import request from '@/utils/request'

// let base = global.baseHost;
// import axios from 'axios'

// ------客户管理------

// ---客户列表
export function getCustomerManagementList(params) {
  return request({
    url: 'rest/customer/list',
    method: 'post',
    data: params
  })
}
// export const getCustomerManagementList = params => { return axios.post(`${base}rest/customer/queryCustomer`,params).then(res => res.data); };

// ---获取客户分类
export function getCustomerClassification(params) {
  return request({
    url: 'rest/customer/classes',
    method: 'get',
    params
  })
}

// ---客户跟进详情查询--客户详情以及历史跟进记录

export function getCustomerDetail(passwordId) {
  return request({
    url: `rest/customer/detail/followup/${passwordId}`,
    method: 'get',
  })
}
// export const getCustomerDetail = customerId => { return axios.get(`${base}rest/customer/detail/queryCustomerDetail/${customerId}`).then(res => res.data); };

// ---获取客户详情--基本情况--提交客户跟进详情
export function getCustomerDetailSubmint(params) {
  return request({
    url: `rest/customer/detail/followup`,
    method: 'post',
    data:params
  })
}
// export const getCustomerDetailSubmint = params => { return axios.post(`${base}rest/customer/detail/submitFollowInfo`,params).then(res => res.data); };

// ---获取客户详情--查询套餐余量
export function getCustomerPackage(customerId) {
  return request({
    url:`rest/customer/detail/comboMargin/${customerId}`,
    method: 'get',
  })
}
// export const getCustomerPackage = customerId => { return axios.get(`${base}rest/customer/detail/queryComboMargin/${customerId}`).then(res => res.data); };

// ---获取客户详情--功能使用
// export function getCustomerFun(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }

// ---获取客户详情--查询功能使用次数
export function getCustomerFunCount(username) {
  return request({
    url: `rest/customer/detail/useTime/${username}`,
    method: 'get',
  })
}
// export const getCustomerFunCount = customerId => { return axios.get(`${base}rest/customer/detail/queryUseTime/${customerId}`).then(res => res.data); };


// ---获取客户详情--客户详情订单记录
export function getCustomerOrder(username) {
  return request({
    url: `rest/customer/detail/orderRecord/${username}`,
    method: 'get'
  })
}
// export const getCustomerOrder = (customerId) => { return axios.get(`${base}rest/customer/detail/queryOrderRecord/${customerId}`).then(res => res.data); };


// ---获取客户详情--订单记录--编号搜索
// export function getCustomerOrderSearchNumber(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }

// ---获取客户详情--客户详情挖掘记录
export function getCustomerMining(customerId) {
  return request({
    url: `rest/customer/detail/miningRecords/${customerId}`,
    method: 'get'
  })
}
// export const getCustomerMining = (customerId) => { return axios.get(`${base}rest/customer/detail/queryMiningRecords/${customerId}`).then(res => res.data); };



// ---查询跟进结果集 / 拨打
export function getCustomerFollowUpResult() {
  return request({
    url: `rest/customer/followup`,
    method: 'get',
  })
}
// export const getCustomerFollowUpResult = () => { return axios.post(`${base}rest/customer/queryFollowup`).then(res => res.data); };
// export const getCustomerFollowUpResult = () => { return axios.get(`${base}rest/customer/detail/queryFollowResult`).then(res => res.data); };


// ---客户删除,批量删除接口
export function deleteCustomer(params) {
  return request({
    url: `/rest/highseas/list`,
    method: 'put',
    data:params
  })
}
// export const deleteCustomer = customerId => { return axios.get(`${base}rest/customer/deleteCustomer/${customerId}`).then(res => res.data); };


// ---客户指派  获取销售人员查询下拉列表  客户专员
export function getCommissionerList(customerState) {
  return request({
    url: `rest/customer/sales/list/${customerState}`,
    method: 'get'
  })
}
// export const getCommissionerList = customerState => { return axios.post(`${base}rest/customer/querySales/${customerState}`).then(res => res.data); };


// ---客户指派  客户专员手下客户量查询
export function getCommissionerListCount(servceName) {
  return request({
    url: `rest/customer/queryCustomeNumbers/${servceName}`,
    method: 'get',
  })
}
// export const getCommissionerListCount = servceName => { return axios.post(`${base}rest/customer/queryCustomeNumbers`,servceName).then(res => res.data); };


// ---客户指派  获取专员下所有客户
export function getCommissionerCustomerList(params) {
  return request({
    url: `rest/common/members`,
    method: 'post',
    data:params
  })
}

// ---客户指派  获取专员下客户数
export function getCommissionerCustomerCount(stuff) {
  return request({
    url: `rest/resAlloc/count/remain/${stuff}`,
    method: 'get'
  })
}

// ---客户指派  提交指派 提交指派操作

export function getSubmitAssignment(toStuff,params) {
  return request({
    url: `rest/resAlloc/submit/force/${toStuff}`,
    method: 'post',
    data:params
  })
}

//提交全部指派操作，返回指派成功的数量
export function getSubmitAssignmentAll(fromStuff,toStuff) {
  return request({
    url: `rest/resAlloc/submit/forceAll/${fromStuff}/${toStuff}`,
    method: 'post'
  })
}

// export const getSubmitAssignment = param=> { return axios.post(`${base}rest/customer/submitSalesByCustomerNums`,param).then(res => res.data); };





// ------客户公海------

// POST /
// 查询客户公海列表

// PUT /rest/highseas/list
// 移动客户到公海中

// POST /rest/highseas/list/{query}
// 查询客户公海列表
// ---列表获取
export function getCustomerPublicList(params) {
  return request({
    url: `rest/highseas/list`,
    method: 'post',
    data: params
  })
}

// ---客户认领 /从公海中认领指定的客户
export function getCustomerClaim(customerPspts) {
  return request({
    url: `rest/resAlloc/submit/self`,
    method: 'post',
    data: customerPspts
  })
}







// ------系统设置------

// ---详情获取
export function getSystemSettingsDetail(params) {
  return request({
    url: `rest/tsConfig/querytsConfig`,
    method: 'post',
    data:params
  })
}
// export const getSystemSettingsDetail = params => { return axios.post(`${base}rest/tsConfig/querytsConfig`,params).then(res => res.data); };

// ---设置保存
export function getSystemSettingsSave(params) {
  return request({
    url: `rest/tsConfig/saveConfig`,
    method: 'post',
    data:params
  })
}
// export const getSystemSettingsSave = params => { return axios.post(`${base}rest/tsConfig/saveConfig`,params).then(res => res.data); };




// ------数据报表------

// ---列表获取  查询数据报表列表
export function getDataReportList(params) {
  return request({
    url: `rest/datareport/list`,
    method: 'post',
    data:params
  })
}

// ---导出 导出数据报表
export function getExportRemove(startTime,endTime) {
  return request({
    url: `rest/datareport/list/export/${startTime}/${endTime}`,
    method: 'get'
  })
}

