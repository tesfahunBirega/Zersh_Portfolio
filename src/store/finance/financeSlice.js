import { createSlice } from "@reduxjs/toolkit";
import { createFinance, deleteFinance, fetchFinance, fetchFinances, updateFinance } from "./financeAction";

export const getFinancesSlice = createSlice({
    name:'finance',
    initialState:{
        finances:[],
        finance:{},
        incomes:[],
        income:{},
        expences:[],
        expence:{},
        payments:[],
        payment:{},
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchFinances.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchFinances.fulfilled, (state,action)=>{
                state.loading = false
                state.incomes = action.payload
            })
            .addCase(fetchFinances.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(fetchFinance.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchFinance.fulfilled, (state,action)=>{
                state.loading = false
                state.incomes = action.payload
            })
            .addCase(fetchFinance.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(createFinance.pending , (state)=>{
                state.loading = true
            })
            .addCase(createFinance.fulfilled, (state,action)=>{
                state.loading = false
                state.incomes.push(action.payload)
            })
            .addCase(createFinance.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(updateFinance.pending , (state)=>{
                state.loading = true 
            })
            .addCase(updateFinance.fulfilled , (state, action)=>{
                state.loading = false 
                state.incomes =  state.incomes.map((item) => item._id == action.payload._id ? action.payload : item)
            })
            .addCase(updateFinance.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(deleteFinance.pending , (state)=>{
                state.loading = true
            })
            .addCase(deleteFinance.fulfilled, (state,action)=>{
                state.loading = false
                state.incomes=state.incomes.filter(item=>item._id!= action.payload._id)
            })
            .addCase(deleteFinance.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
    }
})

