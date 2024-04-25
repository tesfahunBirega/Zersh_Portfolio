import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';
import { baseUrl } from '../../constants';

export const fetchBusinessPlans = createAsyncThunk(
  'businessPlans/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}bussinessPlan`);
      return response.data;
    } catch (error) {
      message.error(`Failed to fetch business plans: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBusinessPlan = createAsyncThunk(
  'businessPlans/fetchOne',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}bussinessPlan/${id}`);
      return response.data;
    } catch (error) {
      message.error(`Failed to fetch business plan: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createBusinessPlan = createAsyncThunk(
  'businessPlans/create',
  async (businessPlanData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}bussinessPlan`, businessPlanData);
      message.success("Business plan created successfully");
      return response.data;
    } catch (error) {
      message.error(`Business plan creation failed! ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBusinessPlan = createAsyncThunk(
  'businessPlans/update',
  async ({ id, businessPlanData }, thunkAPI) => {
    try {
      const response = await axios.patch(`${baseUrl}bussinessPlan/${id}`, businessPlanData);
      message.success("Business plan updated successfully");
      return response.data;
    } catch (error) {
      message.error(`Business plan update failed! ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBusinessPlan = createAsyncThunk(
  'businessPlans/delete',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${baseUrl}bussinessPlan/${id}`);
      message.success("Business plan deleted successfully");
      return response.data;
    } catch (error) {
      message.error(`Business plan deletion failed! ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
