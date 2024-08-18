import { instance } from ".";

export const participantApi = {
  getParticipant: () =>
    fetch(`${API_PATH}/participant/participant?offset=0&limit=10`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      redirect: "follow",
      credentials: "include",
    }).then((response) => response.json()),
  setHideParticipant: (body) => {
    const headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("Content-Type", "application/json");

    return fetch(`${API_PATH}/participant/hide_participant`, {
      method: "POST",
      headers,
      body,
      redirect: "follow",
      credentials: "include",
    });
  },
  setParticipant: (body) => {
    return instance.post("/participant/participant", body);
  },
  changeParticipant: (body) => {
    return instance.put("/participant/participant", body);
  },
};
