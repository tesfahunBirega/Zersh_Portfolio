import { createSlice } from "@reduxjs/toolkit";
import { createBusinessPlan, deleteBusinessPlan, fetchBusinessPlan, fetchBusinessPlans, updateBusinessPlan } from "./bussinessPlanAction";

const initialState = {
  businessPlans: [],
  businessPlan: {},
  loading: false,
  error: null,
};

export const businessPlanSlice = createSlice({
  name: 'businessPlans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusinessPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.businessPlan = action.payload;
      })
      .addCase(fetchBusinessPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBusinessPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusinessPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.businessPlans = action.payload;
      })
      .addCase(fetchBusinessPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBusinessPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBusinessPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.businessPlans.push(action.payload);
      })
      .addCase(createBusinessPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBusinessPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBusinessPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.businessPlans = state.businessPlans.map((plan) =>
          plan._id === action.payload._id ? action.payload : plan
        );
      })
      .addCase(updateBusinessPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBusinessPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBusinessPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.businessPlans = state.businessPlans.filter((plan) => plan._id !== action.payload._id);
      })
      .addCase(deleteBusinessPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
