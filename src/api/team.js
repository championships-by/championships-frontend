import { instance } from ".";
import { fetchWithPagination } from "@utils";

export const teamApi = {
  getTeam: () => {
    return fetchWithPagination(instance, `/team/teams`);
  },
  setTeams: (body) => instance.post(`/team/teams`, body),
  updateTeam: (body) => instance.put(`/team/teams`, body),
};
