import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TService } from "../../service";
import { IProduct } from "../../constants/types";

export const loadProducts = createAsyncThunk<
  IProduct[],
  string,
  { rejectValue: string }
>("products/load", async (id, { rejectWithValue, extra: service }) => {
  try {
    const data = await (service as TService).shops.getAllProducts(id);

    return data as unknown as IProduct[];
  } catch (err) {
    return rejectWithValue("Can't fetch products data");
  }
});

interface IInitialState {
  loading: boolean;
  error: string;
  entities: IProduct[];
  shop_id: string;
}

const initialState: IInitialState = {
  loading: false,
  error: "",
  entities: [],
  shop_id: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setShopId: (state, action) => {
      state.shop_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.entities = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("products/load/pending"),
        (state) => {
          state.loading = true;
          state.error = "";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("products/load/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("products/load/fulfilled"),
        (state) => {
          state.loading = false;
          state.error = "";
        }
      );
  },
});

export const { setShopId } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
export const useProductsSelector = () =>
  useSelector((state: { products: IInitialState }) => state.products);
