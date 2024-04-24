import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';
import { baseUrl } from '../../constants';


export const fetchConversations = createAsyncThunk(
  'conversations/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}conversation`);
      return response.data;
    } catch (error) {
      message.error(`Failed to fetch conversations: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchConversation = createAsyncThunk(
  'conversations/fetchOne',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}conversation/${id}`);
      return response.data;
    } catch (error) {
      message.error(`Failed to fetch conversation: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const createConversation = createAsyncThunk(
    'conversations/create',
    async (conversationData, thunkAPI) => {
      try {
        const response = await axios.post(`${baseUrl}conversation`, conversationData);
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
        const response = await axios.patch(`${baseUrl}conversation/${id}`, conversationData);
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
        const response = await axios.delete(`${baseUrl}conversation/${id}`);
        message.success("Conversation deleted successfully");
        return response.data;
      } catch (error) {
        message.error(`Conversation deletion failed! ${error.message}`);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );