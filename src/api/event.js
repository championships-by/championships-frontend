import { fetchWithPagination } from "@utils";
import { instance } from ".";
import { ROUTER_ROUTES } from "@constants";

export const eventApi = {
  getEvent: (eventID) =>
    instance
      .get(`/${ROUTER_ROUTES.EVENT}/event/get_by_id`, {
        params: {
          event_id: eventID,
        },
      })
      .then((response) => response.data),
  getEventByJudge: (eventID) =>
    instance
      .get(`/${ROUTER_ROUTES.EVENT}/get_all_events_judged_nominations`, {
        params: {
          event_id: eventID,
        },
      })
      .then((response) => response.data),
  getEventWithNominations: async (data) => {
    return fetchWithPagination(
      instance,
      `/${ROUTER_ROUTES.EVENT}/events_with_nominations`,
      data
    );
  },
  getEventsRelatedToDate: async (data) => {
    return fetchWithPagination(
      instance,
      `/${ROUTER_ROUTES.EVENT}/get_events_related_to_date`,
      data
    );
  },
  changeEvent: (body) =>
    instance.patch(`/${ROUTER_ROUTES.EVENT}/event`, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }),
  getEventsWithNominationsByOwner: (queryString) =>
    instance.get(
      `/${ROUTER_ROUTES.EVENT}/events_with_nominations_by_owner?${queryString}`
    ),
  getEventsWithNominationsByJudgeInCommand: (queryString) =>
    instance.get(
      `/${ROUTER_ROUTES.EVENT}/events_with_nominations_by_judge_in_command?${queryString}`
    ),
  getEventWithNominationsAndTeamParticipants: (queryString) =>
    instance
      .get(
        `/${ROUTER_ROUTES.EVENT}/get_event_with_nominations_and_team_participants?${queryString}`
      )
      .then((res) => res.data),
  getEventTeamsNotRelated: (params) => {
    return fetchWithPagination(
      instance,
      `/${ROUTER_ROUTES.EVENT}/get_event_teams_not_related`,
      params
    );
  },
  changeLogo: (formData) =>
    instance.post(`/${ROUTER_ROUTES.EVENT}/event_update_logo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  changeRegulation: (formData) =>
    instance.post(`/${ROUTER_ROUTES.EVENT}/event_update_doc`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteEvent: (params) =>
    instance.delete(`/${ROUTER_ROUTES.EVENT}/delete_event`, {
      params,
    }),
  setEvent: (body) =>
    instance.post(`/${ROUTER_ROUTES.EVENT}/event`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  getEventPhotos: (event_id) =>
    instance.get(`/${ROUTER_ROUTES.EVENT}/get_event_photos`, {
      params: { event_id },
    }),

  uploadEventPhotos: (event_id, formData) =>
    instance.post(
      `/${ROUTER_ROUTES.EVENT}/upload_event_photos?event_id=${event_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    ),
  deleteEventPhotos: (event_id, photos) => {
    instance.delete(
      `/${ROUTER_ROUTES.EVENT}/delete_event_photos?photos=${photos}&event_id=${event_id}`
    );
  },
};
