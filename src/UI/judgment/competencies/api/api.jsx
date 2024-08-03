import axios from "axios";

export const getCompetencies = async () => {
  const response = await axios.get("https://catfact.ninja/breeds");
  console.log(response);
  return response.data.data;
};
