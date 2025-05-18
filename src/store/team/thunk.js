import { createAsyncThunk } from "@reduxjs/toolkit";
import { teamApi } from "@/api";

export const getTeams = createAsyncThunk("teams/getTeams", async () => {
  const data = await teamApi.getTeams();
  return data;
});

export const setTeams = createAsyncThunk("teams/setTeams", async (body) => {
  const response = await teamApi.setTeams(body);
  return response.config.data;
});

export const updateTeam = createAsyncThunk("teams/updateTeam", async (body) => {
  const response = await teamApi.updateTeam(body);
  return response.config.data;
});
