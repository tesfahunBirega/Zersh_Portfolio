import { createSlice } from "@reduxjs/toolkit";
import { createExpense, createIncome, createPayment, deleteExpense, deleteIncome, deletePayment, fetchExpense, fetchExpenses, fetchIncome, fetchIncomes, fetchPayment, fetchPayments, updateExpense, updateIncome, updatePayment } from "./financeAction";

export const FinancesSlice = createSlice({
    name:'finances',
    initialState:{
        finances:[],
        finance:{},
        incomes:[],
        income:{},
        expenses:[],
        expense:{},
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
             // Fetching expenses
            .addCase(fetchExpense.pending, (state) => {
              state.loading = true;
            })
            .addCase(fetchExpense.fulfilled, (state, action) => {
              state.loading = false;
              state.expense = action.payload;
            })
            .addCase(fetchExpense.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })
            // Fetching all expenses
            .addCase(fetchExpenses.pending, (state) => {
              state.loading = true;
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
              state.loading = false;
              state.expenses = action.payload;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })
            // Creating expense
            .addCase(createExpense.pending, (state) => {
              state.loading = true;
            })
            .addCase(createExpense.fulfilled, (state, action) => {
              state.loading = false;
              state.expenses.push(action.payload);
            })
            .addCase(createExpense.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })
            // Updating expense
            .addCase(updateExpense.pending, (state) => {
              state.loading = true;
            })
            .addCase(updateExpense.fulfilled, (state, action) => {
              state.loading = false;
              state.expenses = state.expenses.map((item) => item._id === action.payload._id ? action.payload : item);
            })
            .addCase(updateExpense.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })
            // Deleting expense
            .addCase(deleteExpense.pending, (state) => {
              state.loading = true;
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
              state.loading = false;
              state.expenses = state.expenses.filter(item => item._id != action.payload);
            })
            .addCase(deleteExpense.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })
            // Fetching payments
            .addCase(fetchPayment.pending, (state) => {
              state.loading = true;
            })
            .addCase(fetchPayment.fulfilled, (state, action) => {
              state.loading = false;
              state.payments = action.payload;
            })
            .addCase(fetchPayment.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })
            // Fetching all payments
            .addCase(fetchPayments.pending, (state) => {
              state.loading = true;
            })
            .addCase(fetchPayments.fulfilled, (state, action) => {
              state.loading = false;
              state.payments = action.payload;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })
            // Creating payment
            .addCase(createPayment.pending, (state) => {
              state.loading = true;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
              state.loading = false;
              state.payments.push(action.payload);
            })
            .addCase(createPayment.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })
            // Updating payment
            .addCase(updatePayment.pending, (state) => {
              state.loading = true;
            })
            .addCase(updatePayment.fulfilled, (state, action) => {
              state.loading = false;
              state.payments = state.payments.map((item) => item._id === action.payload._id ? action.payload : item);
            })
            .addCase(updatePayment.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })
            // Deleting payment
            .addCase(deletePayment.pending, (state) => {
              state.loading = true;
            })
            .addCase(deletePayment.fulfilled, (state, action) => {
              state.loading = false;
              state.payments = state.payments.filter(item => item._id !== action.payload);
            })
            .addCase(deletePayment.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            });
    }
})

