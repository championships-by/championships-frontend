import { fetchWithPagination } from "@utils";
import { instance } from ".";

export const eventApi = {
  getEvent: (eventID) =>
    instance
      .get(`/event/event/get_by_id`, {
        params: {
          event_id: eventID,
        },
      })
      .then((response) => response.data),
  getEventWithNominations: async (data) => {
    const { levels } = data;
    delete data.levels;

    let url = "/event/events_with_nominations";

    if (levels) {
      url += `?${levels.map((level) => `levels=${level}`).join("&")}`;
    }

    return fetchWithPagination(instance, url, data);
  },
  changeEvent: (body) =>
    instance.patch(`/event/event`, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }),
  changeLogo: (formData) => instance.post(`/event/event_update_logo`, formData),
  changeRegulation: (formData) =>
    instance.post(`/event/event_update_doc`, formData),
  deleteEvent: (data) =>
    instance.delete(`/event/event`, {
      data: data,
    }),
  setEvent: (body) =>
    instance.post(`/event/event`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
