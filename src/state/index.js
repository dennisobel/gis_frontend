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
  buildings: [],
  role: "Revenue Officer",
  user:{},
  county: {},
  countybuildings:{}
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
    },
    setBuildings: (state, action) => {
      state.buildings = action.payload
    },
    setLoggedUser: (state,action) => {
      state.user = action.payload
    },
    setLoggedCounty: (state,action) => {
      state.county = action.payload
    },
    setCountyBuildings: (state,action) => {
      state.countybuildings = action.payload
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
  setRole,
  setBuildings,
  setLoggedUser,
  setLoggedCounty,
  setCountyBuildings
} = globalSlice.actions;

export default globalSlice.reducer;
