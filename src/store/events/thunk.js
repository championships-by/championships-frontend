import { createAsyncThunk } from "@reduxjs/toolkit";
import { eventApi } from "@api";

export const getEvent = createAsyncThunk("events/getEvent", async (eventID) => {
  const data = await eventApi.getEvent(eventID);
  return data;
});

export const getEventWithNominations = createAsyncThunk(
  "events/getEventWithNominations",
  async ({ published }) => {
    const data = await eventApi.getEventWithNominations({
      published,
    });
    return data;
  }
);

export const changeEvent = createAsyncThunk(
  "events/changeEvent",
  async (body) => {
    const response = await eventApi.changeEvent(body);
    return response.config.data;
  }
);

export const changeLogo = createAsyncThunk(
  "events/changeLogo",
  async (formData) => {
    const response = await eventApi.changeLogo(formData);
    return response.config.data;
  }
);

export const changeRegulation = createAsyncThunk(
  "events/changeRegulation",
  async (formData) => {
    const response = await eventApi.changeRegulation(formData);
    return response.config.data;
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (body) => {
    const response = await eventApi.deleteEvent(body);
    return response.config.data;
  }
);

export const setEvent = createAsyncThunk("events/setEvent", async (body) => {
  const response = await eventApi.setEvent(body);
    return response.config.data;
});
