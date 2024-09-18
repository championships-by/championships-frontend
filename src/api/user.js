import { instance } from ".";
import { fetchWithPagination } from "@utils";

export const userApi = {
  getProfile: () => instance.get(`/user/profile`).then(response => response.data),
  changeProfile: (body) => instance.patch(`/user/profile`, body),
  getUsers: () => {
    return fetchWithPagination(instance, `/user/users`);
  },
  setUser: (body) => instance.post(`/user/create_user`, body),
  getJudges: () => {
    return fetchWithPagination(instance, `/user/judges`);
  },
};
