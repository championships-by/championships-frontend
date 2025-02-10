import { instance } from ".";
import { fetchWithPagination } from "@utils";

export const userApi = {
  getProfile: () =>
    instance.get(`/user/profile`).then((response) => response.data),
  changeProfile: (body) => instance.patch(`/user/profile`, body),
  getUsers: () => {
    return fetchWithPagination(instance, `/user/users`);
  },
  getUnverifiedUsers: () => {
    return fetchWithPagination(instance, `/user/users?is_approved=false`)
  },
  getUsersByName: (params) => {
    return fetchWithPagination(instance, `/user/get_users_by_name`, params);
  },
  setUser: (body) => instance.post(`/user/create_user`, body),
  getUserById: (queryString) => instance.get(`/user/user_data?${queryString}`),
  changeUserById: (queryString, body) =>
    instance.patch(`/user/user_data?${queryString}`, body),
  getJudges: () => {
    return fetchWithPagination(instance, `/user/judges`);
  },
  sendUserRegistrationNotice: (params) =>
    instance.post(
      `/system_notice/send_user_registration_notice`, null, {params}
    ),
  sendPasswordChangeNotice: (params) =>
    instance.post(`/system_notice/send_reset_password_link`, null, {
      params,
    }),
  acceptUser: async (params) => {
    await instance.patch("/user/user_approve", null, { params })
  },
  declineUser: async (params) => {
    await instance.delete("/user/delete_user_not_approved", { params })
  },
  registerUser: async (body) => {
    await instance.post("/user/register", body)
  }
};
