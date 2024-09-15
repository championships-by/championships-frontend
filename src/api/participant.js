import { instance } from ".";

export const participantApi = {
  getParticipant: async () => {
    const response = await instance.get("/participant/participant?offset=0&limit=49");
    return response.data;
  },
  setHideParticipant: (body) =>
    instance.post(`${API_PATH}/participant/hide_participant`, body),
  setParticipant: (body) => {
    return instance.post("/participant/participant", body);
  },
  addParticipantToNomination: (body) => {
    return instance.post("/team_participant_nomination_event/team_participant", body);
  },
  changeParticipant: (body) => {
    return instance.patch("/participant/participant", body);
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
};
