import { instance } from ".";

export const eventApi = {
  getEvent: (eventID) =>
    instance.get(`${API_PATH}/event/event/get_by_id`, {
      params: {
        event_id: eventID,
      },
    }).then(response => response.data),
  getEventWithNominations: async ({ published, limit = 49, offset = 0 }) => {
      const response = await instance.get(`${API_PATH}/event/events_with_nominations`, {
      params: {
        published,
        offset,
        limit,
      },
    });
    const events = response.data;
    if (events.length === limit) {
      return eventApi.getEventWithNominations({ published: published, offset: offset + limit, limit: limit }).then(nextEvents => [...events, ...nextEvents]);
    } else {
      return events;
    }
  },
  changeEvent: (body) => instance.patch(`${API_PATH}/event/event`, body, {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }}),
  changeLogo: (formData) =>
    instance.post(`${API_PATH}/event/event_update_logo`, formData),
  changeRegulation: (formData) =>
    instance.post(`${API_PATH}/event/event_update_doc`, formData),
  deleteEvent: (body) =>
    instance.delete(`${API_PATH}/event/event`, {
      data: body,
    }),
  setEvent: (body) =>
    instance.post(`${API_PATH}/event/event`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
