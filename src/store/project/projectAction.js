import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants";

export const fetchProject = createAsyncThunk(
    'projects/fetchbyid',
    async(blogId, thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}project/${blogId}` , {
            signal:abortController.signal
        })
        if(response.status !== 200){
            abortController.abort()
            return thinkApi.rejectWithValue("Failed to fetch user data.")
        }

        return await response.json()
    }
)

export const fetchProjects = createAsyncThunk(
    'projects',
    async(thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}project` 
        ,
         {
            signal:abortController.signal
        }
        )
        if(response.status !== 200){
            abortController.abort()
            return thinkApi.rejectWithValue("Failed to fetch projects data.")
        }

        return await response.json()
    }
)

export const createProject = createAsyncThunk(
  'projects/create',
  async (project, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}project`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        // Try to parse the response body for more detailed error information
        let errorDetail = 'Failed to create project';
        try {
          const errorResponse = await response.json();
          errorDetail = errorResponse.message || errorDetail;
        } catch (parseError) {
          // Fallback to generic error message if parsing fails
        }
        throw new Error(errorDetail);
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
    'projects/update',
  async (id,blogData, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}project/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const deleteProject = createAsyncThunk(
    'projects/delete',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}project/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)