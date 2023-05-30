import { IOrder } from "../constants/types";
import { post } from "./api";

export const postOrder = (order: IOrder) => post("/order", order);
