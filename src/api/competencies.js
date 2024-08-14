import axios from "axios";

export const competenciesApi = {
  getCompetencies: () =>
    axios.get(`${API_PATH}/breeds`, {
      headers: {
        accept: "application/json",
      },
    }),
};
