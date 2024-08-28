import { instance } from "./index";

export const competenciesApi = {
  getCriteria: (eventId, nominationId) =>
    instance.get(
      `/criteria/api/criteria?event_id=${eventId}&nomination_id=${nominationId}`
    ),
  getCriteriaResults: (eventId, nominationId) =>
    instance.get(
      `/criteria/get_criteria_results?event_id=${eventId}&nomination_id=${nominationId}`
    ),
  setCriteriaResult: ({ eventId, nominationId, criteriaId, teamId, score }) =>
    instance.post(`/criteria/set_criteria_result`, {
      nomination_event: {
        event_id: eventId,
        nomination_id: nominationId,
      },
      criteria_id: criteriaId,
      team_id: teamId,
      score,
    }),

  getCompetenciesEventData: (eventID) => {
    return instance.get(
      `/nomination_event/nominations_event_participant_count?event_id=${eventID}`
    );
  },

  addOlympicCompetenciesForEvent: async (
    eventID,
    nominationName,
    reglament,
    selectedJudges
  ) => {
    axios.post(
      `${API_PATH}/nomination_event/append_nomination_for_event_olympic`,
      {
        append_nomination_event_data: {
          event_id: eventID,
          nomination_name: nominationName,
          reglament: reglament,
          judges_ids: selectedJudges,
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
    selectedJudges,
    criteria
  ) => {
    axios.post(
      `${API_PATH}/nomination_event/append_nomination_for_event_criteria`,
      {
        append_nomination_event_data: {
          event_id: eventID,
          nomination_name: nominationID,
          reglament: reglament,
          judges_ids: selectedJudges,
        },
        criterias: criteria,
      }
    );
  },

  addTimeCompetenciesForEvent: async (
    eventID,
    nominationID,
    reglament,
    selectedJudges,
    raceRoundAmount
  ) => {
    axios.post(
      `${API_PATH}/nomination_event/append_nomination_for_event_time`,
      {
        append_nomination_event_data: {
          event_id: eventID,
          nomination_name: nominationID,
          reglament: reglament,
          judges_ids: selectedJudges,
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
        nomination_id: nominationID,
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
