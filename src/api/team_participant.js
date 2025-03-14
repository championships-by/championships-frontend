import { instance } from ".";
import qs from "qs";

export const team_participantApi = {
  deleteTeamParticipant: (params) => {
    return instance.delete("/team_participant/delete_team_participant", {
      params,
      paramsSerializer: (params) => qs.stringify(params, { indices: false }),
    });
  },
  addTeamParticipant: (params) => {
    return instance.post("/team_participant/team_participant", params);
  },
};
