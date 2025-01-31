import { instance } from ".";

export const competenciesApi = {
  getCriteria: (eventId, nominationId) =>
    instance.get(
      `/criteria/get_nomination_event_criterias?event_id=${eventId}&nomination_id=${nominationId}`
    ),
  getCriteriaResults: (eventId, nominationId) =>
    instance.get(
      `/criteria/get_criteria_results?event_id=${eventId}&nomination_id=${nominationId}`
    ),
  setCriteriaResults: (body) =>
    instance.post("/criteria/set_criteria_result_in_bulk", body),
  getCompetenciesEventData: (eventID) => {
    return instance.get(
      `/nomination_event/nominations_event_participant_count?event_id=${eventID}`
    );
  },
  getParticipantsNominationEvent: (
    eventID,
    nominationID,
    teamID,
    related,
    kind
  ) => {
    return instance.get(
      `/nomination_event/team_participants_of_nomination_event?related=${related}&event_id=${eventID}&nomination_id=${nominationID}&team_id=${teamID}&kind=${kind}`
    );
  },
  addOlympicCompetenciesForEvent: async (data) =>
    instance.post(
      `/nomination_event/append_nomination_for_event_olympic`,
      data
    ),
  addCriteriaCompetenciesForEvent: async (data) =>
    instance.post(
      `/nomination_event/append_nomination_for_event_criteria`,
      data
    ),
  addTimeCompetenciesForEvent: async (data) =>
    instance.post(`/nomination_event/append_nomination_for_event_time`, data),
  getTeamsForCriteriaNomination: (eventID, nominationID, nominationType) => {
    return instance.get(
      `/team_nomination_event/team_participant?event_id=${eventID}&nomination_id=${nominationID}&type=${nominationType}`
    );
  },
  sendJudgeNotice: (data, body) => {
    return instance.post(`/system_notice/send_judge_added_notice`, body, {
      params: data,
    });
  },
  getNominationEventInfo: (params) =>
    instance
      .get(`/nomination_event/nomination_event_info`, { params })
      .then((res) => res.data),
  updateNominationEvent: (queryString, data) =>
    instance.patch(
      `/nomination_event/nomination_event_info?${queryString}`,
      data
    ),
  startGroupStage: (data) =>
    instance.post(`/tournaments/start_group_stage`, data),
  startCriteriaStage: async (data) =>
    instance.post(`/tournaments/start_criteria_stage`, data),
  startTimeStage: async (data) =>
    instance.post(`/tournaments/start_time_stage`, data),
  finishTimeStage: (data) =>
    instance.post(`/tournaments/finish_time_stage`, data),
  finishCriteriaStage: (data) =>
    instance.post(`/tournaments/finish_criteria_state`, data),
  deleteNomination: (data) =>
    instance.delete(`/nomination_event/delete_nomination_from_event`, {
      data,
    }),
  getNominationEventProtocol: (params) =>
    instance.get(`/nomination_event/get_nomination_event_protocol`, {
      params,
      responseType: "blob",
    }),
  editNumberRaceRounds: (params) =>
    instance.patch(`/nomination_event/edit_number_of_race_rounds`, null, {
      params,
    }),
  updateCriteria: (body, params) =>
    instance.patch(`/nomination_event/update_criteria`, body, {
      params,
    }),
  updateEquipment: (body) => {
    return instance.patch(`/equipment/equipment`, body);
  },
  updateSoftware: (body) => {
    return instance.patch(`/software/update`, body);
  },
};
