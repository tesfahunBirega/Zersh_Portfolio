import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants";

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
async (catagoryData, thunkAPI) => {
  console.log(catagoryData ,"catagoryData");
  try {
    // const values = await form.validateFields();
    const formData = new FormData();
  formData.append('name', catagoryData.name);
  formData.append('type', catagoryData.type);
    const response = await fetch(`${baseUrl}blogs`, {
      method: 'POST',
      body: formData,
      headers: {
        "Accept":"*/*"
      },
    });
    console.log(response , "response");
    if (!response.ok) {
      throw new Error('Failed to create blog');
    }

    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
}
)


export const updateCatagory = createAsyncThunk(
    'catagory/update',
  async (id,catagoryData, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}catagory/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(catagoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to update catagory');
      }

      return await response.json();
    } catch (error) {
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

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)