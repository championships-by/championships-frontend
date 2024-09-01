import { instance } from ".";

export const teamApi = {
  getTeam: () =>
    fetch(`${API_PATH}/team/teams?offset=0&limit=49`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      redirect: "follow",
      credentials: "include",
    }).then((response) => response.json()),
  setTeams: (body) => {
    return instance.post(`${API_PATH}/team/teams`, body)
  },
  updateTeam: (data) => {
    return instance.put(`${API_PATH}/team/teams`, data);
  },
};
