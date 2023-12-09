import { useQuery } from "@tanstack/react-query";
import request from "@/utils/axios";
import requestV2 from "@/utils/axios_v2";
import { queryConstants } from "@/constants/queryConstants";

export const orderService = {
  getListWithAveragePrice: (id, params) =>
    request.get(`/orders-with-average-price/${id}`, { params }),
  getDefaultPoducts: (params) =>
    requestV2.get(`/product-add-to-order`, { params }),
  getOrdersCount: (params) =>
    request.get("/orders-count-by-statuses", { params }),
  removeCourier: (id) => request.patch(`/order/${id}/remove-courier`),
  getList: (params) => request.get("/order", { params }),
  getById: (id) => requestV2.get(`/order/${id}`),
  create: (data) => requestV2.post(`/ondemand-order`, data),
  update: (id, data) => requestV2.put(`/order/${id}`, data),
};

export const useOrderList = ({ params, props = { enabled: false } }) => {
  return useQuery(
    [queryConstants.GET_ORDER_LIST, props, params],
    () => orderService.getList(params),
    props,
  );
};

export const useOrderById = ({ id, props = { enabled: false } }) => {
  return useQuery(
    [queryConstants.GET_ORDER_BY_ID, props, id],
    () => orderService.getById(id),
    props,
  );
};

export const useOrderListWithAveragePrice = ({
  id,
  params,
  props = { enabled: false },
}) => {
  return useQuery(
    [queryConstants.GET_ORDER_LIST_AVERAGE_PRICE, props, id, params],
    () => orderService.getListWithAveragePrice(id, params),
    props,
  );
};
export const useDefaultProductsToOrder = ({ params, props }) => {
  return useQuery(
    [queryConstants.GET_DEFAULT_PRODUCTS_TO_ORDER, props],
    () => orderService.getDefaultPoducts(params),
    props,
  );
};
