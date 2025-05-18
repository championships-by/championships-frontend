import { createAsyncThunk } from "@reduxjs/toolkit";
import { participantApi } from "@/api";

export const getParticipant = createAsyncThunk(
  "participants/getParticipant",
  async () => {
    const data = await participantApi.getParticipant();
    return data;
  }
);

export const getParticipantByName = createAsyncThunk(
  "participants/getParticipantByName",
  async (params) => {
    const data = await participantApi.getParticipantByName(params);
    return data;
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
    const data = await participantApi.getParticipantsWithInfo(
      eventID,
      nominationID,
      competitionType
    );
    return data;
  }
);
