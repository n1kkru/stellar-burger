import { getFeedsApi, getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface OrderStateInterface {
  orderRequest: boolean;
  isLoading: boolean;
  feeds: TOrder[];
  error: string | null;
  orderModalData: TOrder | null;
  orderData: TOrder | null;
}

const initialState: OrderStateInterface = {
  orderRequest: false,
  isLoading: false,
  feeds: [],
  error: '',
  orderModalData: null,
  orderData: null,
};

export const fetchGetFeeds = createAsyncThunk(
  'order/getFeeds',
  async function () {
    const res = await getFeedsApi();
    return res;
  }
);

export const fetchGetOrders = createAsyncThunk(
  'order/getOrders',
  async function () {
    const res = await getOrdersApi();
    return res;
  }
);

export const fetchGetOrdersById = createAsyncThunk(
  'order/getOrdersById',
  async function (number: number) {
    const res = await getOrderByNumberApi(number);
    return res;
  }
);

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async function (data: string[]) {
    const res = await orderBurgerApi(data);
    return res;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    addOrder: (state, action: PayloadAction<TOrder>) => {
      state.feeds.push(action.payload);
    },
    resetOrder: (state) => {
      state.orderRequest = false;
      state.orderModalData = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetFeeds.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchGetFeeds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feeds = action.payload.orders;
    });
    builder.addCase(fetchGetFeeds.rejected, (state, action) => {
      state.isLoading = false;
      state.error = String(action.error.message);
    });

    builder.addCase(postOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderModalData = action.payload.order;
    });

    builder.addCase(fetchGetOrders.pending, (state) => {
      state.feeds = [];
    });
    builder.addCase(fetchGetOrders.fulfilled, (state, action) => {
      state.feeds = action.payload;
    });

    builder.addCase(fetchGetOrdersById.pending, (state) => {
      state.feeds = [];
    });
    builder.addCase(fetchGetOrdersById.fulfilled, (state, action) => {
      state.orderData = action.payload.orders[0];      
    });
  }
});

export const { setOrderRequest, addOrder, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
