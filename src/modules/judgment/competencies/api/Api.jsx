import axios from "axios";

export const getCompetencies = async () => {
  const response = await axios.get("https://catfact.ninja/breeds");

  return response.data.data;
};
