import { instance } from ".";
import { fetchWithPagination } from "@utils";
import qs from "qs";

export const participantApi = {
  getParticipant: () => {
    return fetchWithPagination(instance, `/participant/participant`);
  },
  getParticipantsInSystem: (params) => {
    return instance
      .get(`/participant/get_participants_in_system`, { params })
      .then((res) => res.data);
  },
  getParticipantsInTeam: (params) => {
    return instance
      .get(`/participant/get_participants_in_team`, { params })
      .then((res) => res.data);
  },
  getParticipantByName: (params) => {
    return fetchWithPagination(
      instance,
      `/participant/get_participant_by_name`,
      params
    );
  },
  setHideParticipant: (body) =>
    instance.post(`/participant/hide_participant`, body),
  setParticipant: (body) => {
    return instance.post(`/participant/participant`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getParticipantNominationExistingInfo: (params) => {
    return instance
      .get(`/team_participant_nomination_event/team_participant`, { params })
      .then((res) => res.data);
  },
  addParticipantToNomination: (body) => {
    return instance.post(
      "/team_participant_nomination_event/team_participant",
      body
    );
  },

  updateParticipantInNomination: (body) => {
    return instance.patch(
      "/team_participant_nomination_event/team_participant",
      body
    );
  },
  changeParticipant: (body) => {
    return instance.patch(`/participant/participant`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getParticipantStats: (body) => {
    return instance
      .get(`/participant/get_participant_stats`, { params: body })
      .then((res) => res.data);
  },
  getParticipantsWithInfo: async (eventID, nominationID, competitionType) => {
    const response = await instance.get(
      `/nomination_event/team_participants_of_nomination_event?related=true`,
      {
        params: {
          event_id: eventID,
          nomination_id: nominationID,
          kind: competitionType,
        },
      }
    );
    return response.data;
  },
  sendParticipantRegistrationNotice: (queryString) => {
    return instance.post(
      `/system_notice/send_participant_registration_notice?${queryString}`
    );
  },
  deleteTeamParticipantFromNominationEvent: (body) => {
    return instance.delete(
      `/team_participant_nomination_event/team_participant`,
      { data: body }
    );
  },
  checkEmail: async (queryString) => {
    return instance
      .post(`/user/check_email?email=${encodeURIComponent(queryString)}`)
      .then((res) => res.data);
  },
  emailVerification: (params) =>
    instance.post("/participant/email_verification", null, { params }),
  uploadExcel: (formData) => {
    return instance.post(`/participant/create_excel_participants`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
