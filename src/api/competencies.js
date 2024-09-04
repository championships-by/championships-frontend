import axios from "axios";
import { instance } from "./index";

export const competenciesApi = {
  getCriteria: (eventId, nominationId) =>
    instance.get(
      `/criteria/get_nomination_event_criterias?event_id=${eventId}&nomination_id=${nominationId}`
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
  getParticipantsNominationEvent: (eventID, nominationID, related, kind) => {
    return instance.get(
      `/nomination_event/team_participants_of_nomination_event?related=${related}&event_id=${eventID}&nomination_id=${nominationID}&kind=${kind}`
    );
  },
  addOlympicCompetenciesForEvent: async (data) => {
    axios.post(
      `${API_PATH}/nomination_event/append_nomination_for_event_olympic`,
      data
    );
  },
  addCriteriaCompetenciesForEvent: async (data) => {
    return axios.post(
      `${API_PATH}/nomination_event/append_nomination_for_event_criteria`,
      data
    );
  },
  addTimeCompetenciesForEvent: async (data) => {
    return axios.post(
      `${API_PATH}/nomination_event/append_nomination_for_event_time`,
      data
    );
  },
  getTeamsForCriteriaNomination: (eventID, nominationID, nominationType) => {
    return instance.get(
      `${API_PATH}/team_nomination_event/team_participant?event_id=${eventID}&nomination_id=${nominationID}&type=${nominationType}`
    );
  },
  getNominationEventInfo: ({ eventId, nominationId }) =>
    axios.get(
      `${API_PATH}/nomination_event/nomination_event_info?event_id=${eventId}&nomination_id=${nominationId}`
    ),
  startGroupStage: (data) => {
    axios.post(`${API_PATH}/tournaments/start_group_stage`, data);
  },
  startCriteriaStage: async (data) => {
    return axios.post(`${API_PATH}/tournaments/start_criteria_stage`, data);
  },
  startTimeStage: async (data) => {
    return axios.post(`${API_PATH}/tournaments/start_time_stage`, data);
  },
  finishTimeStage: (data) =>
    instance.post(`${API_PATH}/tournaments/finish_time_stage`, data),
  deleteNomination: (data) => {
    return axios.delete(
      `${API_PATH}/nomination_event/delete_nomination_from_event`,
      {
        data,
      }
    );
  },
};
