// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import joblistSlice from '../pages/JobList.js/store/joblist-slice';
 

// Combine slices into the root reducer
const rootReducer = {
  joblist:joblistSlice.reducer,
  // Add other slices if needed
};

// Create the store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
