import { instance } from ".";

export const feedbackApi = {
  sendFeedback: (queryString, body) => instance.post(`/feedback/send_feedback?${queryString}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};
