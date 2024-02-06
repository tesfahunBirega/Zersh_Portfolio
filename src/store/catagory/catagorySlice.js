import { createSlice } from "@reduxjs/toolkit";
import { createCatagory, deleteCatagory, fetchCatagory, fetchcatagories } from "./catagoryyAction";

export const CatagorySlice = createSlice({
    name:'catagories',
    initialState:{
        catagories:[],
        catagory:{},
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchcatagories.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchcatagories.fulfilled, (state,action)=>{
                state.loading = false
                state.catagories = action.payload
            })
            .addCase(fetchcatagories.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(fetchCatagory.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchCatagory.fulfilled, (state,action)=>{
                state.loading = false
                state.catagory = action.payload
            })
            .addCase(fetchCatagory.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(createCatagory.pending , (state)=>{
                state.loading = true
            })
            .addCase(createCatagory.fulfilled, (state,action)=>{
                state.loading = false
                state.catagories.push(action.payload)
            })
            .addCase(createCatagory.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(deleteCatagory.pending , (state)=>{
                state.loading = true
            })
            .addCase(deleteCatagory.fulfilled, (state,action)=>{
                state.loading = false
                state.catagories=state.catagories.filter(item=>item._id!= action.payload._id)
            })
            .addCase(deleteCatagory.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
    }
})

