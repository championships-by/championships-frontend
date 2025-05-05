import axios from "axios";
import { ERRORS } from "@errors";
import { message } from "antd";

// todo перенести все на axios
export * from "./auth";
export * from "./competencies";
export * from "./event";
export * from "./team_participant";
export * from "./judgment";
export * from "./match";
export * from "./participant";
export * from "./team";
export * from "./timeMatches";
export * from "./user";
export * from "./feedback";
export * from "./organizers";
export * from "./notification";
export * from "./certificates";

const excludedUrls = ["/user/profile"];

export const instance = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
  credentials: "include",
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const requestUrl = error?.config?.url;

    if (requestUrl && !excludedUrls.some((url) => requestUrl.includes(url))) {
      if (error.response) {
        const ERROR_TEXT = error?.response?.data?.detail?.error;
        message.error(ERRORS.getError(ERROR_TEXT));
      }
    }

    return Promise.reject(error);
  }
);
