import { instance } from ".";

export const timeMatchesApi = {
  getTimeMatches: (eventId, nominationId) =>
    instance.get(
      `${API_PATH}/race_round/race_round?event_id=${eventId}&nomination_id=${nominationId}`
    ),
  setTimeMatch: (data) =>
    instance.post(`${API_PATH}/race_round/set_race_rounds_in_bulk`, data),
};
