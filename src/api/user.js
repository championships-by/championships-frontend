import { instance } from ".";

export const userApi = {
  getProfile: () => instance.get(`${API_PATH}/user/profile`).then(response => response.data),
  changeProfile: (body) => instance.patch(`${API_PATH}/user/profile`, body),
  getUsers: () => instance.get(`${API_PATH}/user/users`).then(response => response.data),
  setUser: (body) => instance.post(`${API_PATH}/user/create_user`, body),
  getJudges: (offset = 0, limit = 49) => {
    return instance.get(`${API_PATH}/user/judges`, {
      params: {
        offset,
        limit,
      },
    }).then(response => {
      const judges = response.data;
    if (judges.length === limit) {
      return userApi.getJudges(offset + limit).then(nextJudges => [...judges, ...nextJudges]);
    } else {
      return judges;
    }
  });
},
};
