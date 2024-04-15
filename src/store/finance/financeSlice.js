import { createSlice } from "@reduxjs/toolkit";
import { createIncome, deleteIncome, fetchIncome, fetchIncomes, updateIncome } from "./financeAction";

export const FinancesSlice = createSlice({
    name:'finances',
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
            .addCase(fetchIncome.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchIncome.fulfilled, (state,action)=>{
                state.loading = false
                state.incomes = action.payload
            })
            .addCase(fetchIncome.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(fetchIncomes.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchIncomes.fulfilled, (state,action)=>{
                state.loading = false
                state.incomes = action.payload
            })
            .addCase(fetchIncomes.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(createIncome.pending , (state)=>{
                state.loading = true
            })
            .addCase(createIncome.fulfilled, (state,action)=>{
                state.loading = false
                state.incomes.push(action.payload)
            })
            .addCase(createIncome.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(updateIncome.pending , (state)=>{
                state.loading = true 
            })
            .addCase(updateIncome.fulfilled , (state, action)=>{
                state.loading = false 
                state.incomes =  state.incomes.map((item) => item._id == action.payload._id ? action.payload : item)
            })
            .addCase(updateIncome.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(deleteIncome.pending , (state)=>{
                state.loading = true
            })
            .addCase(deleteIncome.fulfilled, (state,action)=>{
                state.loading = false
                state.incomes=state.incomes.filter(item=>item._id!= action.payload._id)
            })
            .addCase(deleteIncome.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
    }
})

