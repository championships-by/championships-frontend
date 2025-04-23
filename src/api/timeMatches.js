import { instance } from ".";

export const timeMatchesApi = {
  getTimeMatches: (eventId, nominationId) =>
    instance.get(
      `/race_round/race_round?event_id=${eventId}&nomination_id=${nominationId}`
    ),
  setTimeMatch: (data) =>
    instance.post("/race_round/set_race_rounds_in_bulk", data),
};
