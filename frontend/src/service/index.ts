import * as api from "./api";
import * as shops from "./shops";

export const service = { api, shops };

export type TService = typeof service;
