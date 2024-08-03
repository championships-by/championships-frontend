export const authApi = {
  setLogin: (body) =>
    fetch(`${API_PATH}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      redirect: "follow",
      credentials: "include",
    }),
  setLogout: () =>
    fetch(`${API_PATH}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
    }),
};
