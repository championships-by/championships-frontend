import { instance } from "./index";

export const authApi = {
  setLogin: (body) => instance.post(`${API_PATH}/auth/login`, body, {}),
  setLogout: () => instance.post(`${API_PATH}/auth/logout`, {}, {}),
};
