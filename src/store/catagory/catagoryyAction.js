import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants";

import {
  message,
} from "antd";
export const fetchCatagory = createAsyncThunk(
    'catagory/fetchbyid',
    async(catagoryId, thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}catagory/${catagoryId}` , {
            signal:abortController.signal
        })
        if(response.status !== 200){
            abortController.abort()
            return thinkApi.rejectWithValue("Failed to fetch catagory data.")
        }

        return await response.json()
    }
)

export const fetchCatagories = createAsyncThunk(
    'catagory',
    async(thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}catagory` 
        ,
         {
            signal:abortController.signal
        }
        )
        if(response.status !== 200){
            abortController.abort()
            return thinkApi.rejectWithValue("Failed to fetch catagory data.")
        }

        return await response.json()
    }
)



export const createCatagory = createAsyncThunk(
  'catagory/create',
async (categoryData, thunkAPI) =>{
  try {
    const response = await fetch(`${baseUrl}catagory`, {
      method: 'POST',
      body: JSON.stringify(categoryData) ,
     headers:{
      'Content-Type': 'application/json',
     }
    });
    if (!response.ok) {
      throw new Error('Failed to create blog');
    }
    message.success("Category created successfully");


    return await response.json();
  } catch (error) {
    message.error("Category created successfully");
    return thunkAPI.rejectWithValue(error.message);
  }
}
)


export const updateCatagory = createAsyncThunk(
    'catagory/update',
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}catagory/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.catagoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to update catagory');
      }
      message.success("Category Updated successfully");
      return await response.json();
    } catch (error) {
      message.error("Category Update Failed!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const deleteCatagory = createAsyncThunk(
    'catagory/delete',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}catagory/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update catagory');
      }
      message.success("Category deleted successfully");
      return await response.json();
    } catch (error) {
      message.error("Category delete Failed " + error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)