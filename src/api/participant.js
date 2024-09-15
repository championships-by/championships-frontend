import { instance } from "./index";

export const participantApi = {
  getParticipant: () => {
    return instance.get("/participant/participant?offset=0&limit=49");
  },
  setHideParticipant: (body) =>
    instance.post(`${API_PATH}/participant/hide_participant`, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }),
  setParticipant: (body) => {
    return instance.post("/participant/participant", body);
  },
  addParticipantToNomination: (body) => {
    return instance.post("/team_participant_nomination_event/team_participant", body);
  },
  changeParticipant: (body) => {
    return instance.patch("/participant/participant", body);
  },
  getParticipantsWithInfo: (eventID, nominationID, competitionType) => {
    return instance.get(
      `/nomination_event/team_participants_of_nomination_event?related=true`,
      {
        params: {
          event_id: eventID,
          nomination_id: nominationID,
          kind: competitionType,
        },
      }
    );
  },
};
