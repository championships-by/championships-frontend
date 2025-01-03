import { instance } from ".";

export const authApi = {
  setLogin: (body) => instance.post(`/auth/login`, body),
  setLogout: () => instance.post(`/auth/logout`),
  resetPassword: (params) =>
    instance.post(`/auth/reset_password`, null, { params }),
};
