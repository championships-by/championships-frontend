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
    return fetchWithPagination(
      instance,
      "/event/events_with_nominations",
      data
    );
  },
  changeEvent: (body) =>
    instance.patch(`/event/event`, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }),
  getEventsWithNominationsByOwner: (queryString) =>
    instance.get(`/event/events_with_nominations_by_owner?${queryString}`),
  getEventsWithNominationsByJudgeInCommand: (queryString) =>
    instance.get(
      `/event/events_with_nominations_by_judge_in_command?${queryString}`
    ),
  getEventWithNominationsAndTeamParticipants: (queryString) =>
    instance.get(
      `/event/get_event_with_nominations_and_team_participants?${queryString}`
    ),
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
