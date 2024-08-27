import axios from "axios";
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
        append_nomination_event_data: {
          event_id: eventID,
          nomination_name: nominationName,
          reglament: reglament,
          judges_ids: [6, 7],
        },
        group_count: 1,
        play_of_participants_count: 1,
      }
    );
  },

  addCriteriaCompetenciesForEvent: async (
    eventID,
    nominationID,
    reglament,
    criteria
  ) => {
    axios.post(
      `${API_PATH}/nomination_event/append_nomination_for_event_criteria`,
      {
        append_nomination_event_data: {
          event_id: eventID,
          nomination_name: nominationID,
          reglament: reglament,
          judges_ids: [6, 7],
        },
        criterias: criteria,
      }
    );
  },

  addTimeCompetenciesForEvent: async (
    eventID,
    nominationID,
    reglament,
    raceRoundAmount
  ) => {
    axios.post(
      `${API_PATH}/nomination_event/append_nomination_for_event_time`,
      {
        append_nomination_event_data: {
          event_id: eventID,
          nomination_name: nominationID,
          reglament: reglament,
          judges_ids: [6, 7],
        },
        race_round_amount: raceRoundAmount,
      }
    );
  },

  getTeamsForCriteriaNomination: (eventID, nominationID, nominationType) => {
    return instance.get(
      `${API_PATH}/team_nomination_event/team_participant?event_id=${eventID}&nomination_id=${nominationID}&type=${nominationType}`
    );
  },

  startGroupStage: (eventID, nominationID, groupCount) => {
    axios.post(`${API_PATH}/tournaments/start_group_stage`, {
      nomination_event: {
        event_id: eventID,
        nominationID_id: nominationID,
      },
      group_count: groupCount,
    });
  },
  startCriteriaStage: (eventID, nominationID) => {
    axios.post(`${API_PATH}/tournaments/start_criteria_stage`, {
      event_id: eventID,
      nomination_id: nominationID,
    });
  },
  startTimeStage: (eventID, nominationID) => {
    axios.post(`${API_PATH}/tournaments/start_time_stage`, {
      event_id: eventID,
      nomination_id: nominationID,
    });
  },
};
