import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/constants/types";
import { useSelector } from "react-redux";

const initialState: IUser = {
  name: "",
  email: "",
  phone: "",
  adress: {
    description: "",
    lat: null,
    lng: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      const name = action.payload;
      return { ...state, name };
    },
    setUserEmail: (state, action) => {
      const email = action.payload;
      return { ...state, email };
    },
    setUserPhone: (state, action) => {
      const phone = action.payload;
      return { ...state, phone };
    },
    setUserAdress: (state, action) => {
      const adress = action.payload;
      return { ...state, adress };
    },
  },
});

export const { setUserName, setUserEmail, setUserPhone, setUserAdress } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
export const useUserSelector = () =>
  useSelector((state: { user: IUser }) => state.user);
