import * as api from "./api";
import * as shops from "./shops";
import * as order from "./order";

export const service = { api, shops, order };

export type TService = typeof service;
