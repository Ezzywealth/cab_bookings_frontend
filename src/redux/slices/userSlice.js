import Cookies from 'js-cookie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const usersUrl = process.env.REACT_APP_API_USERS;

const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  loading: false,
  error: '',
};

export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
  const response = await axios.post(`${usersUrl}/sign_in`, {
    body: JSON.stringify(user),
  });
  const { data } = response;
  return data;
});

export const signUpUser = createAsyncThunk('user/signUpUser', async (user) => {
  const response = await axios.post(`${usersUrl}`, {
    user,
  });
  const { data } = response;
  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      Cookies.remove('user');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      Cookies.set('user', JSON.stringify(action.payload.user), { expires: 1 });
    });
  },
});

export const { login, signOut } = userSlice.actions;
export default userSlice.reducer;
