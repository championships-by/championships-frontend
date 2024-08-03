import { matchApi } from "@api";

const Queries = {
  getMatches: async (event_id, nomination_id) => {
    const response = await matchApi.getMatch(event_id, nomination_id);
    const responseJson = await response.json();
    return responseJson;
  },
  setMatches: async (
    event_id,
    nomination_id,
    match,
    team1Score,
    team2Score
  ) => {
    const data = {
      nomination_event: {
        event_id,
        nomination_id,
      },
      match_id: match.match.match_id,
      team1_score: team1Score,
      team2_score: team2Score,
    };

    matchApi.setMatch(data).then((response) => {
      if (response.ok) {
        window.location.reload();
      }
    });
  },
};

export default Queries;
