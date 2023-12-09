import request from '@/utils/axios'

export const getBranches = (params, id) =>
  request({
    headers: { Shipper: id },
    method: 'get',
    url: '/branches',
    params,
  })

export const getCouriers = (params) =>
  request({ method: 'get', url: '/couriers', params })
