import { createSelector } from "@reduxjs/toolkit";

export const selectCurrentLanguage = createSelector(
  (state) => state.language,
  (language) => language.currentLanguage
);
