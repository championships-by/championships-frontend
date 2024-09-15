import { createAsyncThunk } from "@reduxjs/toolkit";
import { participantApi } from "@api";

export const getParticipant = createAsyncThunk(
  "participants/getParticipant",
  async () => {
    const response = await participantApi.getParticipant();
    return response.data;
  }
);

export const setHideParticipant = createAsyncThunk(
  "participants/setHideParticipant",
  async (body) => {
    const response = await participantApi.setHideParticipant(body);
    return response.config.data;
  }
);

export const setParticipant = createAsyncThunk(
  "participants/setParticipant",
  async (body) => {
    const response = await participantApi.setParticipant(body);
    return response.config.data;
  }
);

export const changeParticipant = createAsyncThunk(
  "participants/changeParticipant",
  async (body) => {
    const response = await participantApi.changeParticipant(body);
    return response.config.data;
  }
);

export const getParticipantsWithInfo = createAsyncThunk(
  "participants/getParticipantsWithInfo",
  async (eventID, nominationID, competitionType) => {
    const response = await participantApi.getParticipantsWithInfo(
      eventID,
      nominationID,
      competitionType
    );
    return response.data;
  }
);
