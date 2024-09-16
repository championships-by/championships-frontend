import { instance } from ".";

export const participantApi = {
  getParticipant: (offset = 0, limit = 49) => {
      return instance.get("/participant/participant", {
        params: {
          offset,
          limit,
        },
      }).then(response => {
        const participants = response.data;
      if (participants.length === limit) {
        return participantApi.getParticipant(offset + limit).then(nextParticipants => [...participants, ...nextParticipants]);
      } else {
        return participants;
      }
    });
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
