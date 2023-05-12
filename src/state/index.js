import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  userId: "63701cc1f03239b7f700000e",
  activePage: "",
  searchQuery: "",
  isAuthenticated: true,
  signup: {
    name: "",
    phoneNumber: "",
    email: "",
    workId: "",
    password: "",
    role: "",
  },
  login: {
    email: "",
    password: "",
    role: ""
  },
  otp: {
    otp: "",
  },
  revenueOfficer: {
    name: "",
    phoneNumber: "",
    email: "",
    workId: "",
    password: "",
    block: ""
  },
  mapType: "Markers",
  mapData: "Buildings",
  role: "Revenue Officer"
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setIsAuthenticated: (state) => {
      state.isAuthenticated = state.isAuthenticated === false ? true : false;
    },
    setSignup: (state, action) => {
      state.signup = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setRevenueOfficer: (state, action) => {
        state.revenueOfficer = action.payload
    },
    setMapType: (state, action) => {
      state.mapType = action.payload
    },
    setMapData: (state, action) => {
      state.mapData = action.payload
    },
    setRole: (state, action) => {
      state.role = action.payload
    }
  },
});

export const {
  setMode,
  setActivePage,
  setSearchQuery,
  setIsAuthenticated,
  setSignup,
  setLogin,
  setOtp,
  setRevenueOfficer,
  setMapType,
  setMapData,
  setRole
} = globalSlice.actions;

export default globalSlice.reducer;
