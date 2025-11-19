import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommendations: [],
};

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState,
  reducers: {
    setRecommendations: (state, action) => {
      state.recommendations = action.payload;
    },
    clearRecommendations: (state) => {
      state.recommendations = [];
    },
  },
});

export const { setRecommendations, clearRecommendations } =
  recommendationSlice.actions;

export default recommendationSlice.reducer;
