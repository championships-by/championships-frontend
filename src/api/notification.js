import { instance } from ".";

export const notificationApi = {
  sendNotification: (message) => {
    return instance.post(`${API_PATH}/system_notice/send_general_mail`, null, {
      params: { message_text: message },
    });
  },
};
