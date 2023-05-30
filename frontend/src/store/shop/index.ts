import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TService } from "../../service";
import { IShop } from "../../constants/types";

export const loadShops = createAsyncThunk<
  IShop[],
  void,
  { rejectValue: string }
>("shops/load", async (_, { rejectWithValue, extra: service }) => {
  try {
    const data = await (service as TService).shops.getAllShops();

    return data as unknown as IShop[];
  } catch (err) {
    return rejectWithValue("Can't fetch shops data");
  }
});

interface IInitialState {
  loading: boolean;
  error: string;
  entities: IShop[];
}

const initialState: IInitialState = {
  loading: false,
  error: "",
  entities: [],
};

const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadShops.fulfilled, (state, action) => {
        state.entities = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("shops/load/pending"),
        (state) => {
          state.loading = true;
          state.error = "";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("shops/load/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("shops/load/fulfilled"),
        (state) => {
          state.loading = false;
          state.error = "";
        }
      );
  },
});

export const shopsReducer = shopsSlice.reducer;
export const useShopsSelector = () =>
  useSelector((state: { shops: IInitialState }) => state.shops);
