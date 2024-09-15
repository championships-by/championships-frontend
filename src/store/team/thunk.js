import { createAsyncThunk } from "@reduxjs/toolkit";
import { teamApi } from "@api";

export const getTeams = createAsyncThunk("teams/getTeams", async () => {
  const response = await teamApi.getTeams();
  return response.data;
});

export const setTeams = createAsyncThunk("teams/setTeams", async (body) => {
  const response = await teamApi.setTeams(body);
  if (response.status === 200) {
    return response.config.data;
  }
  return response.data;
});

export const updateTeam = createAsyncThunk("teams/updateTeam", async (body) => {
  const response = await teamApi.updateTeam(body);
  return response.config.data;
});
