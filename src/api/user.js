import axios from "axios";

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
    const headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("Content-Type", "application/json");

    return fetch(`${API_PATH}/user/create_user`, {
      method: "POST",
      headers,
      body,
      redirect: "follow",
      credentials: "include",
    });
  },
  getJudges: ({ limit }) =>
    axios.get(`${API_PATH}/user/judges`, {
      params: {
        offset: 0,
        limit: limit,
      },
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    }),
};
