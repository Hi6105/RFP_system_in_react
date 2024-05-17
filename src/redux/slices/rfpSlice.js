
import { createSlice } from '@reduxjs/toolkit';

//Creating state variables and their corresponding reducers
const rfpSlice = createSlice({
  name: 'rfp',
  initialState: {
    selectedRfpId: null,
    selectedItemName : null,
  },
  reducers: {
    setRfpId: (state, action) => {
      state.selectedRfpId = action.payload;
    },
    setItemName: (state, action) => {
        state.selectedItemName = action.payload;
      },
  },
});

export const { setRfpId, setItemName } = rfpSlice.actions;
export default rfpSlice.reducer;
