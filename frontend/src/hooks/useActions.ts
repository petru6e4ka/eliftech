import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  setUserName,
  setUserEmail,
  setUserPhone,
  setUserAdress,
} from "../store/user";
import { setShopId } from "../store/products";
import { orderReset } from "../store/reset";
import {
  setOrderShopId,
  addProductToOrder,
  deleteProductFromOrder,
  changeQantityInOrder,
} from "../store/order";

const actions = {
  setUserName,
  setUserEmail,
  setUserPhone,
  setUserAdress,
  setShopId,
  orderReset,
  setOrderShopId,
  addProductToOrder,
  deleteProductFromOrder,
  changeQantityInOrder,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
