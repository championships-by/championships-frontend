export const matchApi = {
  setMatch: (body) =>
    fetch(`${API_PATH}/match/set_group_match_result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
      body: JSON.stringify(body),
    }),
  getMatch: async (event_id, nomination_id) => {
    const headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("Content-Type", "application/json");

    return fetch(
      `${API_PATH}/match/get_group_matches?event_id=${event_id}&nomination_id=${nomination_id}`,
      {
        method: "GET",
        headers,
        body: null,
        redirect: "follow",
        credentials: "include",
      }
    );
  },
};
