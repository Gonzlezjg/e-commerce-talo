import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import cartReducer from '../features/cartSlice';
import userReducer from '../features/userSlice';
import { productsApi } from '../products/products';

const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  user: authReducer,
  cart: cartReducer,
  users: userReducer,
});

export default rootReducer;
