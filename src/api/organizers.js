import { fetchWithPagination } from "@/utils";
import { instance } from ".";

export const organizerApi = {
  getOrganizers: () => {
    return fetchWithPagination(instance, `/organizer/organizer`);
  },
  getOrganizersRelatedToEvent: (event_id) =>
    instance
      .get(`/organizer/get_organizers_related_to_event?event_id=${event_id}`)
      .then((res) => res.data),
  createOrganizer: (name) =>
    instance.post("/organizer/organizer", { name }).then((res) => res.data),
};
