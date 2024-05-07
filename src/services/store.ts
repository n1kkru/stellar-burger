import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import burgerReducers from '../services/burgerSlice';
import orderReducers from '../services/orderSlice';
import userReducers from '../services/userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  burgerReducers: burgerReducers,
  orderReducers: orderReducers,
  userReducers: userReducers,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
