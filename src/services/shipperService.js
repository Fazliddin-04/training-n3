import request from "@/utils/axios";

const shipperService = {
  getById: (id, params) => request.get(`/shippers/${id}`, { params }),
  update: (data) => request.put("/shippers", data),
};

export default shipperService;
