import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./users";
import { eventsSlice } from "./events";
import { participantsSlice } from "./participants";
import { teamsSlice } from "./team";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    events: eventsSlice.reducer,
    participants: participantsSlice.reducer,
    teams: teamsSlice.reducer,
  },
});
