import axios from "axios";

export const competenciesApi = {
  getCompetencies: () =>
    axios.get(`${API_PATH}/breeds`, {
      headers: {
        accept: "application/json",
      },
    }),

  getCompetenciesEventData: (eventID) =>
    axios.get(`${API_PATH}/nomination_event/nomination_event_data`, {
      params: {
        event_id: eventID,
      },
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    }),
};
