import axios from "axios";
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
  getEventWithNominations: ({ published }) =>
  {
    return instance.get(`${API_PATH}/event/events_with_nominations?${
        published ? `published=${published}&` : ``
      }offset=0&limit=49`).then((response) => response.data)
  },

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
  changeLogo: (formData) => {
    return axios.post(`${API_PATH}/event/event_update_logo`, formData);
  },
  changeRegulation: (formData) => {
    return axios.post(`${API_PATH}/event/event_update_doc`, formData);
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
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
