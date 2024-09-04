import axios from "axios";

// todo перенести все на axios
export * from "./auth";
export * from "./competencies";
export * from "./event";
export * from "./judgment";
export * from "./match";
export * from "./participant";
export * from "./team";
export * from "./timeMatches";
export * from "./user";

export const instance = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
});
