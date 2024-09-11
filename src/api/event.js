import instance from "axios";

export const eventApi = {
  getEvent: (eventID) =>
    instance.get(`${API_PATH}/event/event/get_by_id?event_id=${eventID}`),
  getEventWithNominations: ({ published }) =>
    instance.get(
      `${API_PATH}/event/events_with_nominations?${
        published ? `published=${published}&` : ``
      }offset=0&limit=49`
    ),
  changeEvent: (body) => instance.patch(`${API_PATH}/event/event`, body),
  changeLogo: (formData) =>
    instance.post(`${API_PATH}/event/event_update_logo`, formData),
  changeRegulation: (formData) =>
    instance.post(`${API_PATH}/event/event_update_doc`, formData),
  deleteEvent: (body) => instance.delete(`${API_PATH}/event/event`, body),
  setEvent: (body) => instance.post("/event/event", body),
};
