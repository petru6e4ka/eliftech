import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TService } from "../../service";
import { IOrder, IProduct, IUser } from "../../constants/types";
import { orderReset } from "../reset";

export const createOrder = createAsyncThunk<
  IOrder,
  void,
  { rejectValue: string }
>("order/create", async (_, { rejectWithValue, extra: service, getState }) => {
  try {
    const state = getState() as unknown as {
      user: IUser;
      order: { products: IProduct[]; shop_id: string };
    };

    const data = await (service as TService).order.postOrder({
      user: state.user,
      products: state.order.products,
      shop_id: state.order.shop_id,
    });

    return data as unknown as IOrder;
  } catch (err) {
    return rejectWithValue("Something went wrong, please, try later");
  }
});

interface IInitialState {
  loading: boolean;
  error: string;
  shop_id: string;
  products: IProduct[];
}

const initialState: IInitialState = {
  loading: false,
  error: "",
  products: [],
  shop_id: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderShopId: (state, action) => {
      state.shop_id = action.payload;
    },
    addProductToOrder: (state, action) => {
      const exist = state.products.find(
        (product) => product.title === action.payload.title
      );

      if (exist) {
        return {
          ...state,
          products: state.products.map((product) => {
            if (product.title === action.payload.title) {
              return {
                ...product,
                quantity: product.quantity ? product.quantity + 1 : 1,
              };
            }
            return product;
          }),
        };
      }
      state.products.push({ ...action.payload, quantity: 1 });
    },
    deleteProductFromOrder: (state, action) => {
      const filtered = state.products.filter(
        (product) => product.title !== action.payload
      );

      if (filtered.length === 0) {
        return initialState;
      }

      return {
        ...state,
        products: filtered,
      };
    },
    changeQantityInOrder: (state, action) => {
      const { title, quantity } = action.payload;

      return {
        ...state,
        products: state.products.map((product) => {
          if (product.title === title) {
            return { ...product, quantity };
          }
          return product;
        }),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderReset, () => {
        return initialState;
      })
      .addMatcher(
        (action) => action.type.endsWith("order/create/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("order/create/pending"),
        (state) => {
          state.loading = true;
          state.error = "";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("order/create/fulfilled"),
        () => {
          return initialState;
        }
      );
  },
});

export const orderReducer = orderSlice.reducer;
export const {
  setOrderShopId,
  addProductToOrder,
  deleteProductFromOrder,
  changeQantityInOrder,
} = orderSlice.actions;
export const useOrderSelector = () =>
  useSelector((state: { order: IInitialState }) => state.order);
