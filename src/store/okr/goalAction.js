import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants";
import axios from "axios";
import { message } from "antd";

export const fetchGoal = createAsyncThunk(
    'goal/fetchbyid',
    async(id, thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}goal/${id}` , {
            signal:abortController.signal
        })
        if(response.status !== 200){
            abortController.abort()
            return thinkApi.rejectWithValue("Failed to fetch user data.")
        }

        return await response.json()
    }
)

export const fetchGoals = createAsyncThunk(
    'goals/fetch',
    async (_, thunkAPI) => {
      const abortController = new AbortController();
  
      try {
        const response = await fetch(`${baseUrl}goal`, {
          signal: abortController.signal
        });
  
        if (response.status !== 200) {
          abortController.abort();
          return thunkAPI.rejectWithValue("Failed to fetch goal data.");
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error fetching goals:', error);
        return thunkAPI.rejectWithValue("Failed to fetch goal data.");
      }
    }
  );


export const createGoal = createAsyncThunk(
    'goal/create',
    async (goalData, thunkAPI) => {
      try {
        const response = await axios.post(`${baseUrl}goal`, goalData);
        message.success("Goal created successfully");
        return response.data;
      } catch (error) {
        message.error(`Goal creation failed! ${error.message}`);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  export const updateGoal = createAsyncThunk(
    'goal/update',
    async ({ id, values }, thunkAPI) => {
      try {
        const response = await axios.patch(`${baseUrl}goal/${id}`, values);
        message.success("Goal updated successfully");
        return response.data;
      } catch (error) {
        message.error(`Goal update failed! ${error.message}`);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  export const deleteGoal = createAsyncThunk(
    'goal/delete',
    async (goalId, thunkAPI) => {
      try {
        const response = await axios.delete(`${baseUrl}goal/${goalId}`);
        message.success("Goal deleted successfully");
        return goalId; // Return the deleted goal ID
      } catch (error) {
        message.error(`Goal deletion failed! ${error.message}`);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );