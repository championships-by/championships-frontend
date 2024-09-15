import { instance } from ".";

export const userApi = {
  getProfile: () => instance.get(`${API_PATH}/user/profile`).then(response => response.data),
  changeProfile: (body) => instance.patch(`${API_PATH}/user/profile`, body),
  getUsers: () => instance.get(`${API_PATH}/user/users`).then(response => response.data),
  setUser: (body) => instance.post(`${API_PATH}/user/create_user`, body),
  getJudges: async ({ limit }) => {
    const response = await instance.get(`${API_PATH}/user/judges`, {
      params: {
        offset: 0,
        limit,
      },
    });
    return response.data;
  },
};
