import { instance } from "./index";

export const timeMatchesApi = {
  getTimeMatches: ({ eventId, nominationId }) =>
    instance.get(
      `${API_PATH}/race_round/race_round?event_id=${eventId}&nomination_id=${nominationId}`
    ),
};
