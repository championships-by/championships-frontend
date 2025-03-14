import { instance } from ".";

export const judgmentApi = {
  getMatches: async (eventId, nominationId) => {
    return instance.get(`${API_PATH}/match/get_group_matches`, {
      params: {
        event_id: eventId,
        nomination_id: nominationId,
        type,
      },
    });
  },
  setMatches: async (
    eventId,
    nominationId,
    matchId,
    team1Score,
    team2Score
  ) => {
    const data = {
      nomination_event: {
        event_id: eventId,
        nomination_id: nominationId,
      },
      match_id: matchId,
      team1_score: team1Score,
      team2_score: team2Score,
    };

    return instance.post(`${API_PATH}/match/set_group_match_result`, data);
  },
  getPlayoffMatches: async (eventId, nominationId) => {
    return instance.get(`${API_PATH}/match/get_bracket_matches`, {
      params: {
        event_id: eventId,
        nomination_id: nominationId,
      },
    });
  },
  setPlayoffMatch: async (
    eventId,
    nominationId,
    matchId,
    team1Score,
    team2Score
  ) => {
    const data = {
      nomination_event: {
        event_id: eventId,
        nomination_id: nominationId,
        type,
      },
      match_id: matchId,
      team1_score: team1Score,
      team2_score: team2Score,
    };

    return instance.post(`${API_PATH}/match/set_bracket_match_result`, data);
  },
  getPlayoffResults: (params) =>
    instance.get(`/match/get_playoff_results`, { params }),
};
