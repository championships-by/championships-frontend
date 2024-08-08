import axios from "axios";

//what is url?
const API_PATH = "https://catfact.ninja";


export const competenciesApi = {

  getCompetencies: () =>

    axios.get(`${API_PATH}/breeds`, {

      headers: {

        accept: "application/json",

      },

    }),

};