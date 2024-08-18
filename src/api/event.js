import { instance } from ".";

export const eventApi = {
  getEvent: (eventID) =>
    fetch(`${API_PATH}/event/event/get_by_id?event_id=${eventID}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      redirect: "follow",
      credentials: "include",
    }).then((response) => response.json()),
  getEventWithNominations: ({ limit }) =>
    fetch(`${API_PATH}/event/events_with_nominations?offset=0&limit=${limit}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      redirect: "follow",
      credentials: "include",
    }).then((response) => response.json()),
  changeEvent: (body) => {
    const headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return fetch(`${API_PATH}/event/event`, {
      method: "PATCH",
      headers,
      body,
      redirect: "follow",
      credentials: "include",
    });
  },
  deleteEvent: (body) => {
    const headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("Content-Type", "application/json");

    return fetch(`${API_PATH}/event/event`, {
      method: "DELETE",
      headers,
      body,
      redirect: "follow",
      credentials: "include",
    });
  },
  setEvent: (body) => {
    return instance.post("/event/event", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
