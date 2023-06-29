import request from '@/utils/request'

// 设置审批数据
export function getWorkFlowData(data) {
  return request({
    baseURL: "/",
    url: `/mock/data.json`,
    method: 'post',
    data: data
  })
}
