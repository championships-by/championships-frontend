import { instance } from "./index";

export const teamApi = {
  getTeam: () =>
    instance.get(`${API_PATH}/team/teams`, {
      params: {
        offset: 0,
        limit: 49,
      },
    }),
  setTeams: (body) => instance.post(`${API_PATH}/team/teams`, body, {}),
  updateTeam: (data) => instance.put(`${API_PATH}/team/teams`, data, {}),
};
