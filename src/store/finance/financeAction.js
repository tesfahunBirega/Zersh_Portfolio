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