import { createSlice } from "@reduxjs/toolkit";
import { createCatagory, deleteCatagory, fetchCatagory, fetchCatagories, updateCatagory } from "./catagoryyAction";

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
            .addCase(fetchCatagories.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchCatagories.fulfilled, (state,action)=>{
                state.loading = false
                state.catagories = action.payload
            })
            .addCase(fetchCatagories.rejected , (state, action)=>{
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
                state.catagories=[...state.catagories, action.payload]
            })
            .addCase(createCatagory.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(updateCatagory.pending , (state)=>{
                state.loading = true 
            })
            .addCase(updateCatagory.fulfilled , (state, action)=>{
                state.loading = false 
                state.catagories =  state.catagories.map((item) => item._id == action.payload._id ? action.payload : item)
            })
            .addCase(updateCatagory.rejected , (state, action)=>{
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

