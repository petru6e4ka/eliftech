import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  setUserName,
  setUserEmail,
  setUserPhone,
  setUserAdress,
} from "../store/user";
import { setShopId } from "../store/products";

const actions = {
  setUserName,
  setUserEmail,
  setUserPhone,
  setUserAdress,
  setShopId,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
