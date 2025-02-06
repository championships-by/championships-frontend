import { instance } from ".";
import { fetchWithPagination } from "@utils";

export const teamApi = {
  getTeam: () => {
    return fetchWithPagination(instance, `/team/teams`);
  },
  setTeams: (body) => instance.post(`/team/teams`, body),
  updateTeam: (body) => instance.put(`/team/teams`, body),
  getTeamById: (queryString) =>
    instance
      .get(`/team/get_team_by_id?${queryString}`)
      .then((response) => response.data),
  deleteTeam: (params) => {
    return instance.delete("/team/delete_event_team_not_related", { params })
  }
};
