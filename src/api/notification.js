import { instance } from ".";

export const notificationApi = {
  sendNotification: (message) => {
    return instance.post("/system_notice/send_general_mail", null, {
      params: { message_text: message },
    });
  },
  sendRegistrationNomination: (params) => {
    return instance.post(
      "/system_notice/send_nomination_event_registation",
      null,
      {
        params,
      }
    );
  },
};
