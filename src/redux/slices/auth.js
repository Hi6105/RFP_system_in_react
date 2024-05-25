import { createSlice } from "@reduxjs/toolkit";

// Function to load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Function to save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch {
    // Ignore write errors
  }
};

// Load initial state from local storage
const initialState = loadState() || {
  selectedToken: null,
  selectedUser: null,
};

// Creating state variables and their corresponding reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.selectedToken = action.payload;
      saveState(state); // Save state to local storage after updating token
    },
    setUser: (state, action) => {
      state.selectedUser = action.payload;
      saveState(state); // Save state to local storage after updating user
    },
  },
});

export const { setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
