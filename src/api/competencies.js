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

  getParticipantsNominationEvent: (eventID, nominationID, related, kind) => {
    return instance.get(
      `/nomination_event/team_participants_of_nomination_event?related=${related}&event_id=${eventID}&nomination_id=${nominationID}&kind=${kind}`
    );
  },

  addOlympicCompetenciesForEvent: async (data) => {
    return axios.post(
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

  startGroupStage: async (data) => {
    return axios.post(`${API_PATH}/tournaments/start_group_stage`, data);
  },
  startCriteriaStage: async (data) => {
    return axios.post(`${API_PATH}/tournaments/start_criteria_stage`, data);
  },
  startTimeStage: async (data) => {
    return axios.post(`${API_PATH}/tournaments/start_time_stage`, data);
  },
  deleteNomination: (data) => {
    return axios.delete(
      `${API_PATH}/nomination_event/delete_nomination_from_event`,
      {
        data,
      }
    );
  },
};
