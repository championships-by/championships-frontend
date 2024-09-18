import { instance } from ".";

export const authApi = {
  setLogin: (body) => instance.post(`/auth/login`, body),
  setLogout: () => instance.post(`/auth/logout`),
};
