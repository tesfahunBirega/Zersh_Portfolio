import { createSlice } from "@reduxjs/toolkit";
import { fetchGoals, fetchGoal } from "./goalAction";

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
            .addCase(fetchGoals.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchGoals.fulfilled, (state,action)=>{
                state.loading = false
                state.blogs = action.payload
            })
            .addCase(fetchGoals.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            
    }
})

