import { instance } from "./index";

export const competenciesApi = {
  getCompetencies: () =>
    axios.get(`${API_PATH}/breeds`, {
      headers: {
        accept: "application/json",
      },
    }),

  getCompetenciesEventData: (eventID) => {
    return instance.get(
      `/nomination_event/nominations_event_participant_count?event_id=${eventID}`
    );
  },

  addOlympicCompetenciesForEvent: async (
    eventID,
    nominationName,
    reglament
  ) => {
    axios.post(
      `${API_PATH}/nomination_event/append_nomination_for_event_olympic`,
      {
        event_id: eventID,
        nomination_name: nominationName,
        reglament: reglament,
      }
    );
  },

  getTeamsForCriteriaNomination: (eventID, nominationID, nominationType) => {
    return instance.get(
      `${API_PATH}/team_nomination_event/team_participant?event_id=${eventID}&nomination_id=${nominationID}&type=${nominationType}`
    );
  },
};
