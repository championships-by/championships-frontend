import axios from "axios";
import { instance } from "./index";

export const userApi = {
  getProfile: () =>
    fetch(`${API_PATH}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
    }).then((response) => response.json()),
  changeProfile: (body) =>
    fetch(`${API_PATH}/user/profile`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      redirect: "follow",
      credentials: "include",
    }),
  getUsers: () =>
    fetch(`${API_PATH}/user/users`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      redirect: "follow",
      credentials: "include",
    }).then((response) => response.json()),
  setUser: (body) => {
    return instance.post(`/user/create_user`, body);
  },
  getJudges: ({ limit }) => {
    return instance.get(`/user/judges?offset=0&limit=${limit}`);
  },
};
