import { instance } from ".";

export const authApi = {
  setLogin: (body) => instance.post(`/auth/login`, body),
  setLogout: () => instance.post(`/auth/logout`),
  firstLogin: (params) => instance.get(`/auth/first_login`, { params }),
  sendNewToken: (params) =>
    instance.post(`/system_notice/resend_registration_notice`, null, {
      params,
    }),
  resetPassword: (params) =>
    instance.post(`/auth/reset_password`, null, { params }),
};
