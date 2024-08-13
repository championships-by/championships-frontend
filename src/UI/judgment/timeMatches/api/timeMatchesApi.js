export const timeMatchesApi = {
  getTimeMatches: async ({ eventId, nominationId }) => {
    const requestOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: null,
      redirect: "follow",
      credentials: "include",
    };
    const response = await fetch(
      `${API_PATH}/race_round/race_round?event_id=${eventId}&nomination_id=${nominationId}`,
      requestOptions
    );

    const json = await response.json();
    return {
      status: {
        ok: response.ok,
        code: response.status,
        message: response.statusText,
      },
      data: json,
    };
  },
};
