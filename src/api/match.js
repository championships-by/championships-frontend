import { instance } from ".";

export const matchApi = {
  setMatch: (body) => instance.post("/match/set_group_match_result", body),
  getMatch: async (event_id, nomination_id) => {
    return instance.get("/match/get_group_matches", {
      params: {
        event_id,
        nomination_id,
      },
    });
  },
};
