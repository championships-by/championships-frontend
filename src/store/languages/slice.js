import { createSlice } from "@reduxjs/toolkit";
import { changeLanguageAsync } from "./thunk";
import i18n from "i18next";

const initialState = {
  currentLanguage: localStorage.getItem("language") || "ru",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      i18n.changeLanguage(action.payload);
      localStorage.setItem("language", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeLanguageAsync.fulfilled, (state, action) => {
        state.currentLanguage = action.payload;
      })
      .addCase(changeLanguageAsync.rejected, (state, action) => {
        console.error("Ошибка при изменении языка:", action.error.message);
      });
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
