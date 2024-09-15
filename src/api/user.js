import { instance } from "./index";

export const userApi = {
  getProfile: () => instance.get(`${API_PATH}/user/profile`),
  changeProfile: (body) => instance.patch(`${API_PATH}/user/profile`, body),
  getUsers: () => instance.get(`${API_PATH}/user/users`),
  setUser: (body) => instance.post(`${API_PATH}/user/create_user`, body),
  getJudges: ({ limit }) => {
    return instance.get(`${API_PATH}/user/judges`, {
      params: {
        offset: 0,
        limit,
      },
    });
  },
};
