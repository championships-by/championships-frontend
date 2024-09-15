import { instance } from ".";

export const teamApi = {
  getTeam: () =>
    instance.get(`${API_PATH}/team/teams`, {
      params: {
        offset: 0,
        limit: 49,
      },
    }).then(response => response.data),
  setTeams: (body) => instance.post(`${API_PATH}/team/teams`, body),
  updateTeam: (data) => instance.put(`${API_PATH}/team/teams`, data),
};
