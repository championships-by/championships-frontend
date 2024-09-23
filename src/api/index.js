import axios from "axios";
import { ERRORS } from "@errors";
import { message} from "antd";

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
export * from "./feedback";

export const instance = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
});


instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const ERROR_TEXT = error?.response?.data?.detail?.error;
      message.error(ERRORS.getError(ERROR_TEXT));
    } 
    
    return Promise.reject(error);
  }
);