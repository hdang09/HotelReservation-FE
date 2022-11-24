import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../config';

export const getRoomsAsync = createAsyncThunk('rooms/getRoomsAsync', async () => {
  const resp = await fetch(`${API_URL}/rooms`);
  if (resp.ok) {
    const rooms = await resp.json();
    return { rooms };
  }
});

export const bookRoomAsync = createAsyncThunk('rooms/bookRoomAsync', async (payload) => {
  try {
    const res = await fetch(`${API_URL}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    console.log(res);
  } catch (e) {
    console.error(e);
  }
});

export const updateRoomAsync = createAsyncThunk('rooms/updateRoomAsync', async (payload) => {
  await fetch(`${API_URL}/rooms`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
});

export const updateStatusAsync = createAsyncThunk('rooms/updateStatusAsync', async (payload) => {
  await fetch(`${API_URL}/rooms/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: payload.status }),
  });
});

export const deleteRoomAsync = createAsyncThunk('rooms/deleteRoomAsync', async (payload) => {
  await fetch(`${API_URL}/rooms/${payload.id}`, {
    method: 'DELETE',
  });
});

export const getReportAsync = createAsyncThunk('rooms/getReportAsync', async (payload) => {
  try {
    const res = await fetch(`${API_URL}/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: payload }),
    });
    console.log(res);
  } catch (e) {
    console.error(e);
  }
});

export const roomSlice = createSlice({
  name: 'rooms',
  initialState: [],
  extraReducers: {
    [getRoomsAsync.fulfilled]: (state, action) => {
      return action.payload.rooms;
    },
    [bookRoomAsync.fulfilled]: () => {},
    [updateRoomAsync.fulfilled]: () => {},
    [updateStatusAsync.fulfilled]: () => {},
    [deleteRoomAsync.fulfilled]: () => {},
  },
});

export default roomSlice.reducer;
