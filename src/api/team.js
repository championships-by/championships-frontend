import { instance } from ".";

export const teamApi = {
  getTeam: (offset = 0, limit = 49) => {
    return instance.get(`${API_PATH}/team/teams`, {
      params: {
        offset,
        limit,
      },
    }).then(response => {
      const teams = response.data;
      if (teams.length === limit) {
        return teamApi.getTeam(offset + limit, limit).then(nextTeams => [...teams, ...nextTeams]);
      } else {
        return teams;
      }
    });
  },
  setTeams: (body) => instance.post(`${API_PATH}/team/teams`, body),
  updateTeam: (data) => instance.put(`${API_PATH}/team/teams`, data),
};
