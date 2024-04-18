import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants";
import axios from "axios";
import {
  message,
} from "antd";

export const fetchIncome = createAsyncThunk(
    'finance/get',
    async(financeId, thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}finances/${financeId}` , {
            signal:abortController.signal
        })
        if(response.status !== 200){
            abortController.abort()
            return thinkApi.rejectWithValue("Failed to fetch finance data.")
        }

        return await response.json()
    }
)

export const fetchIncomes = createAsyncThunk(
    'finances',
    async(thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}finance/income` 
        ,
         {
            signal:abortController.signal
        }
        )
        if(response.status !== 200){
            abortController.abort()
            return thinkApi.rejectWithValue("Failed to fetch finances data.")
        }

        return await response.json()
    }
)



export const createIncome = createAsyncThunk(
    'finances/create',
  async (financeData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}finance/income/`, financeData , {
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
      });
    
      if (!response) {
        throw new Error('Failed to create finance');
      }
     
      message.success("finance created successfully");
      return  response.data;
    } catch (error) {
      message.error(`finance create Failed! ${error.message}`);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const updateIncome = createAsyncThunk(
    'finances/update',
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await fetch(`${baseUrl}finances/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.financeData),
      });

      if (!response.ok) {
        throw new Error('Failed to update finance');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const deleteIncome = createAsyncThunk(
    'finances/delete',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}finances/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update finance');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const fetchExpense = createAsyncThunk(
  'expenses/get',
  async (expenseId, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}expenses/${expenseId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchExpenses = createAsyncThunk(
  'expenses',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}finance/expense`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createExpense = createAsyncThunk(
  'expenses/create',
  async (expenseData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}finance/expense`, expenseData);
      message.success("Expense created successfully");
      return response.data;
    } catch (error) {
      message.error(`Failed to create expense: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/update',
  async (data , thunkAPI) => {
    try {
      const response = await axios.patch(`${baseUrl}finance/expense/${data.id}`,data.expenseData);
      message.success("Expense updated successfully");
      return response.data;
    } catch (error) {
      message.error(`Failed to update expense: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${baseUrl}finance/expense/${id}`);
      message.success("Expense deleted successfully");
      return id;
    } catch (error) {
      message.error(`Failed to delete expense: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const fetchPayment = createAsyncThunk(
  'payments/get',
  async (paymentId, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}finance/payment/${paymentId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPayments = createAsyncThunk(
  'payments',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}finance/payment`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createPayment = createAsyncThunk(
  'payments/create',
  async (paymentData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}finance/payment`, paymentData);
      message.success("Payment created successfully");
      return response.data;
    } catch (error) {
      message.error(`Failed to create payment: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePayment = createAsyncThunk(
  'payments/update',
  async ({ id, paymentData }, thunkAPI) => {
    try {
      const response = await axios.patch(`${baseUrl}finance/payment/${id}`, paymentData);
      message.success("Payment updated successfully");
      return response.data;
    } catch (error) {
      message.error(`Failed to update payment: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePayment = createAsyncThunk(
  'payments/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${baseUrl}finance/payment/${id}`);
      message.success("Payment deleted successfully");
      return id;
    } catch (error) {
      message.error(`Failed to delete payment: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);