import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLanguage } from "./slice";

export const changeLanguageAsync = createAsyncThunk(
  "language/changeLanguageAsync",
  async (language, { dispatch }) => {
    dispatch(setLanguage(language));
    return language;
  }
);
