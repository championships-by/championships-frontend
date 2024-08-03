export const matchApi = {
  setMatch: (data) =>
    fetch(`${API_PATH}/match/set_group_match_result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
      body: JSON.stringify(data),
    }),
  getMatch: async (event_id, nomination_id) => {
    const headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers,
      body: null,
      redirect: "follow",
      credentials: "include",
    };

    return fetch(
      `${API_PATH}/match/get_group_matches?event_id=${event_id}&nomination_id=${nomination_id}`,
      requestOptions
    );
  },
};
