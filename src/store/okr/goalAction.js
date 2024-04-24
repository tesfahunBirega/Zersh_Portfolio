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
    'goals',
    async(thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}goal` 
        ,
         {
            signal:abortController.signal
        }
        )
        if(response.status !== 200){
            abortController.abort()
            return thinkApi.rejectWithValue("Failed to fetch goal data.")
        }

        return await response.json()
    }
)


export const createConversation = createAsyncThunk(
    'conversations/create',
    async (conversationData, thunkAPI) => {
      try {
        const response = await axios.post(`${baseUrl}/conversations`, conversationData);
        message.success("Conversation created successfully");
        return response.data;
      } catch (error) {
        message.error(`Conversation creation failed! ${error.message}`);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  export const updateConversation = createAsyncThunk(
    'conversations/update',
    async ({ id, conversationData }, thunkAPI) => {
      try {
        const response = await axios.patch(`${baseUrl}/conversations/${id}`, conversationData);
        message.success("Conversation updated successfully");
        return response.data;
      } catch (error) {
        message.error(`Conversation update failed! ${error.message}`);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  export const deleteConversation = createAsyncThunk(
    'conversations/delete',
    async (id, thunkAPI) => {
      try {
        const response = await axios.delete(`${baseUrl}/conversations/${id}`);
        message.success("Conversation deleted successfully");
        return response.data;
      } catch (error) {
        message.error(`Conversation deletion failed! ${error.message}`);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
