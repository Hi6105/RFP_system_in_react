import { configureStore } from '@reduxjs/toolkit';
import rfpReducer from '../slices/rfpSlice';

//Creating redux store with reducer configuration
const store = configureStore({
  reducer: {
    rfp: rfpReducer,
  },
});

export default store;
