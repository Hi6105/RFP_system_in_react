import { configureStore } from '@reduxjs/toolkit';
import rfpReducer from '../slices/rfpSlice';
import authReducer from "../slices/auth";

//Creating redux store with reducer configuration
const store = configureStore({
  reducer: {
    rfp: rfpReducer,
    auth : authReducer
  },
});

export default store;
