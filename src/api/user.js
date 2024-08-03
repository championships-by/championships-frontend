export const userApi = {
  getProfile: () =>
    fetch(`${API_PATH}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
    }),
  changeProfile: (data) =>
    fetch(`${API_PATH}/user/profile`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
    }),
  setUser: (body) => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    return fetch(`${API_PATH}/user/create_user`, {
      method: "POST",
      headers: myHeaders,
      body,
      redirect: "follow",
      credentials: "include",
    });
  },
};
