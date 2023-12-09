import request from "@/utils/axios";

const userService = {
  getList: (params) => request.get(`/shipper-users`, { params }),
  getById: (id, params) => request.get(`/shipper-users/${id}`, { params }),
  create: (data) => request.post("/shipper-users", data),
  update: (data) => request.put("/shipper-users", data),
  delete: (id) => request.delete(`/shipper-users/${id}`),
  login: (data) => request.post("/shipper-users/login", data),
  updatePwd: (data) => request.patch("/shipper-users/change-password", data), // update password
};

export default userService;
