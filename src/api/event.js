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
  getEventByJudge: (eventID) =>
    instance
      .get(`/event/get_all_events_judged_nominations`, {
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
  getEventsRelatedToDate: async (data) => {
    return fetchWithPagination(
      instance,
      "/event/get_events_related_to_date",
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
    instance
      .get(
        `/event/get_event_with_nominations_and_team_participants?${queryString}`
      )
      .then((res) => res.data),
  getEventTeamsNotRelated: (params) => {
    return fetchWithPagination(
      instance,
      `/event/get_event_teams_not_related`,
      params
    );
  },
  changeLogo: (formData) =>
    instance.post(`/event/event_update_logo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  changeRegulation: (formData) =>
    instance.post(`/event/event_update_doc`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteEvent: (params) =>
    instance.delete(`/event/delete_event`, {
      params,
    }),
  setEvent: (body) =>
    instance.post(`/event/event`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  getEventPhotos: (event_id) =>
    instance.get(`/event/get_event_photos`, { params: { event_id } }),

  uploadEventPhotos: (event_id, formData) =>
    instance.post(`/event/upload_event_photos?event_id=${event_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }),
  deleteEventPhotos: (event_id, photos) => {
    instance.delete(
      `/event/delete_event_photos?photos=${photos}&event_id=${event_id}`
    );
  },
  getOrganizers: () =>
    instance
      .get(`/organizer/organizer?offset=0&limit=10`)
      .then((org) => org.data),
  getOrganizersRelatedToEvent: (event_id) =>
    instance
      .get(`/organizer/get_organizers_related_to_event?event_id=${event_id}`)
      .then((org) => org.data),
  createOrganizer: (name) =>
    instance
      .post(
        "/organizer/organizer",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => res.data),
};
