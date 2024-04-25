import { createSlice } from "@reduxjs/toolkit";
import { fetchGoals, fetchGoal, createGoal, updateGoal, deleteGoal } from "./goalAction";

export const getGoalsSlice = createSlice({
    name:"goal",
    initialState:{
        goals:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchGoal.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchGoal.fulfilled, (state,action)=>{
            state.loading = false
            state.blog=action.payload
        })
        .addCase(fetchGoal.rejected , (state , action )=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const getOGoalsSlice = createSlice({
    name:'goals',
    initialState:{
        goals:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchGoals.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchGoals.fulfilled, (state, action) => {
            state.loading = false;
            state.goals = action.payload;
          })
          .addCase(fetchGoals.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(createGoal.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(createGoal.fulfilled, (state, action) => {
            state.loading = false;
            state.goals.push(action.payload);
          })
          .addCase(createGoal.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(updateGoal.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateGoal.fulfilled, (state, action) => {
            state.loading = false;
            // Find the index of the updated goal and replace it with the updated data
            const index = state.goals.findIndex((goal) => goal._id === action.payload._id);
            if (index !== -1) {
              state.goals[index] = action.payload;
            }
          })
          .addCase(updateGoal.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(deleteGoal.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteGoal.fulfilled, (state, action) => {
            state.loading = false;
            // Filter out the deleted goal from the state
            state.goals = state.goals.filter((goal) => goal._id !== action.payload);
          })
          .addCase(deleteGoal.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
            
    }
})

