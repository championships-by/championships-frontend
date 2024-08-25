import { instance } from "./index";

export const competenciesApi = {
  getCriteria: (eventId, nominationId) =>
    instance.get(
      `/criteria/api/criteria?event_id=${eventId}&nomination_id=${nominationId}`
    ),
  getCriteriaResults: (eventId, nominationId) =>
    instance.get(
      `/criteria/get_criteria_results?event_id=${eventId}&nomination_id=${nominationId}`
    ),
  setCriteriaResult: ({ eventId, nominationId, criteriaId, teamId, score }) =>
    instance.post(`/criteria/set_criteria_result`, {
      nomination_event: {
        event_id: eventId,
        nomination_id: nominationId,
      },
      criteria_id: criteriaId,
      team_id: teamId,
      score,
    }),
};
