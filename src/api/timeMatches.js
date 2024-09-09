import { instance } from "./index";

export const timeMatchesApi = {
  getTimeMatches: (eventId, nominationId) =>
    instance.get(
      `${API_PATH}/race_round/race_round?event_id=${eventId}&nomination_id=${nominationId}`
    ),
  setTimeMatch: (eventId, nominationId, raceRoundId, result) =>
    instance.post(`${API_PATH}/race_round/race_round`, {
      nomination_event: {
        event_id: eventId,
        nomination_id: nominationId,
      },
      race_round_id: raceRoundId,
      result,
    }),
};
