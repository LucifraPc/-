import request from '@/utils/request'

let base = global.baseHost;
import axios from 'axios'

// ------客户管理------

// ---客户列表
// export function getCustomerManagementList(params) {
//   return request({
//     url: `${base}rest/customer/queryCustomer`,
//     method: 'post',
//     data: params
//   })
// }
export const getCustomerManagementList = params => { return axios.post(`${base}rest/customer/queryCustomer`,params).then(res => res.data); };

// ---获取客户分类
// export function getCustomerClassification(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }

// ---客户跟进详情查询--客户详情以及历史跟进记录

// export function getCustomerDetail(params) {
//   return request({
//     url: 'rest/customer/detail/queryCustomerDetail/{customerId}',
//     method: 'get',
//     params
//   })
// }
export const getCustomerDetail = customerId => { return axios.get(`${base}rest/customer/detail/queryCustomerDetail/${customerId}`).then(res => res.data); };

// ---获取客户详情--基本情况--提交客户跟进详情
// export function getCustomerDetailSubmint(params) {
//   return request({
//     url: 'rest/customer/detail/submitFollowInfo',
//     method: 'post',
//     params
//   })
// }
export const getCustomerDetailSubmint = params => { return axios.post(`${base}rest/customer/detail/submitFollowInfo`,params).then(res => res.data); };

// ---获取客户详情--查询套餐余量
// export function getCustomerPackage(params) {
//   return request({
//     url: 'rest/customer/detail/queryComboMargin',
//     method: 'get',
//     params
//   })
// }
export const getCustomerPackage = customerId => { return axios.get(`${base}rest/customer/detail/queryComboMargin/${customerId}`).then(res => res.data); };

// ---获取客户详情--功能使用
export function getCustomerFun(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

// ---获取客户详情--查询功能使用次数
// export function getCustomerFunCount(params) {
//   return request({
//     url: 'rest/customer/detail/queryUseTime',
//     method: 'get',
//     params
//   })
// }
export const getCustomerFunCount = customerId => { return axios.get(`${base}rest/customer/detail/queryUseTime/${customerId}`).then(res => res.data); };


// ---获取客户详情--客户详情订单记录
// export function getCustomerOrder(params) {
//   return request({
//     url: 'rest/customer/detail/queryOrderRecord',
//     method: 'get',
//     params
//   })
// }
export const getCustomerOrder = (customerId) => { return axios.get(`${base}rest/customer/detail/queryOrderRecord/${customerId}`).then(res => res.data); };


// ---获取客户详情--订单记录--编号搜索
export function getCustomerOrderSearchNumber(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

// ---获取客户详情--客户详情挖掘记录
// export function getCustomerMining(params) {
//   return request({
//     url: 'rest/customer/detail/queryMiningRecords',
//     method: 'get',
//     params
//   })
// }
export const getCustomerMining = (customerId) => { return axios.get(`${base}rest/customer/detail/queryMiningRecords/${customerId}`).then(res => res.data); };



// ---查询跟进结果集
// export function getCustomerFollowUpResult(params) {
//   return request({
//     url: 'rest/customer/detail/queryFollowResult',
//     method: 'get',
//     params
//   })
// }
export const getCustomerFollowUpResult = () => { return axios.get(`${base}rest/customer/detail/queryFollowResult`).then(res => res.data); };

// ---客户删除,批量删除接口
// export function deleteCustomer(params) {
//   return request({
//     url: 'rest/customer/deleteCustomer/{customerId}',
//     method: 'get',
//     params
//   })
// }
export const deleteCustomer = customerId => { return axios.get(`${base}rest/customer/deleteCustomer/${customerId}`).then(res => res.data); };


// ---客户指派  获取销售人员查询下拉列表  客户专员
// export function getCommissionerList(params) {
//   return request({
//     url: 'rest/customer/queryCustomeNumbers',
//     method: 'post',
//     params
//   })
// }
export const getCommissionerList = customerState => { return axios.post(`${base}rest/customer/queryCustomeNumbers`,customerState).then(res => res.data); };


// ---客户指派  客户专员手下客户量查询
// export function getCommissionerListCount(params) {
//   return request({
//     url: 'rest/customer/queryCustomeNumbers',
//     method: 'post',
//     params
//   })
// }
export const getCommissionerListCount = servceName => { return axios.post(`${base}rest/customer/queryCustomeNumbers`,servceName).then(res => res.data); };


// ---客户指派  获取专员下所有客户
// export function getCommissionerCustomerList(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }

// ---客户指派  提交指派 客户专员的客户变动

// export function getSubmitAssignment(params) {
//   return request({
//     url: '/rest/customer/submitSalesByCustomerNums',
//     method: 'post',
//     params
//   })
// }
export const getSubmitAssignment = param=> { return axios.post(`${base}rest/customer/submitSalesByCustomerNums`,param).then(res => res.data); };





// ------客户公海------

// ---列表获取
export function getCustomerPublicList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

// ---客户认领
export function getCustomerClaim(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}







// ------系统设置------

// ---详情获取
export function getSystemSettingsDetail(params) {
  return request({
    url: 'rest/tsConfig/querytsConfig',
    method: 'post',
    data:params
  })
}
// export const getSystemSettingsDetail = params => { return axios.post(`${base}rest/tsConfig/querytsConfig`,params).then(res => res.data); };

// ---设置保存
export function getSystemSettingsSave(params) {
  return request({
    url: 'rest/tsConfig/saveConfig',
    method: 'post',
    data:params
  })
}
// export const getSystemSettingsSave = params => { return axios.post(`${base}rest/tsConfig/saveConfig`,params).then(res => res.data); };




// ------数据报表------

// ---列表获取
export function getDataReportList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

// ---导出
export function getExportRemove(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

