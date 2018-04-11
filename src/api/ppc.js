import request from '@/utils/request'

export function getDataMiningInfo(username, password) {
  return request({
    // http://bm.lubansoft.com/essencesale/queryMiningTaskByPage.htm
    baseURL: 'http://bm.lubansoft.com/essencesale/queryMiningTaskByPage.htm',
    // url: '/user/login',
    method: 'post',
    data: {
      taskParam: {
        addUser: "",
        currentPage: 1,
        endDate: "",
        name: "",
        pageSize: 25,
        sortFiled: null,
        sortType: null,
        startDate: "",
        status: "0",
      }
    }
  })
}
