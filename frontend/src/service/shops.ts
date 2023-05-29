import { get } from "./api";

export const getAllShops = () => get("/shops");
export const getAllProducts = (id: string) => get(`/shops/${id}`);
