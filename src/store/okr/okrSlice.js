import { createSlice } from "@reduxjs/toolkit";
import { fetchOkr, fetchOkrs } from "./okrAction";

export const getOkrSlice = createSlice({
    name:"okr",
    initialState:{
        goals:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchOkr.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchOkr.fulfilled, (state,action)=>{
            state.loading = false
            state.blog=action.payload
        })
        .addCase(fetchOkr.rejected , (state , action )=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const getOkrsSlice = createSlice({
    name:'okrs',
    initialState:{
        goals:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchOkrs.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchOkrs.fulfilled, (state,action)=>{
                state.loading = false
                state.blogs = action.payload
            })
            .addCase(fetchOkrs.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
    }
})

