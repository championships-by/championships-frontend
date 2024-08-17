export const judgmentApi = {
  getMatches: async (eventId, nominationId) => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: null,
      redirect: "follow",
      credentials: "include",
    };
    const response = await fetch(
      `${API_PATH}/match/get_group_matches?event_id=${eventId}&nomination_id=${nominationId}`,
      requestOptions
    );
    const json = await response.json();
    return json;
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

    const response = await fetch(`${API_PATH}/match/set_group_match_result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
      body: JSON.stringify(data),
    });

    return response;
  },
};
