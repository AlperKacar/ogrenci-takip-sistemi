import { createSlice } from "@reduxjs/toolkit";

const userInformation = createSlice({
  name: "userInformation",
  initialState: {
    user: null,
    token: null,
    isLogged: false,
  },
  reducers: {
    setLogin: (state, { payload }) => {
      state.token = payload;
      state.isLogged = true;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setLogout: (state, { payload }) => {
      state.token = null;
      state.user = null;
      state.isLogged = false;
    },
  },
});

export const userData = (state) => state.userInformation; // state üzerindeki bilgileri dışarı aktarma

export const { setLogin, setLogout, setUser } = userInformation.actions; // functions dışarıya aktarılması

export default userInformation.reducer;
