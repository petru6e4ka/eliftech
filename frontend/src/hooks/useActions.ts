import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  setUserName,
  setUserEmail,
  setUserPhone,
  setUserAdress,
} from "../store/user";

const actions = {
  setUserName,
  setUserEmail,
  setUserPhone,
  setUserAdress,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
