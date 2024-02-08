import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants";

export const fetchBlog = createAsyncThunk(
    'blogs/fetchbyid',
    async(blogId, thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}blogs/${blogId}` , {
            signal:abortController.signal
        })
        if(response.status !== 200){
            abortController.abort()
            return thinkApi.rejectWithValue("Failed to fetch user data.")
        }

        return await response.json()
    }
)

export const fetchBlogs = createAsyncThunk(
    'blogs',
    async(thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}blogs` 
        ,
         {
            signal:abortController.signal
        }
        )
        if(response.status !== 200){
            abortController.abort()
            return thinkApi.rejectWithValue("Failed to fetch blogs data.")
        }

        return await response.json()
    }
)

export const createBlog = createAsyncThunk(
    'blogs/create',
  async (blogData, thunkAPI) => {
    console.log(blogData ,"blogData");
    try {
      // const values = await form.validateFields();
      const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('author', blogData.author);
    formData.append('description', blogData.description);
    formData.append('body', blogData.body);
    formData.append('category', blogData.category);
    formData.append('image', blogData.image);
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

export const updateBlog = createAsyncThunk(
    'blogs/update',
  async (id,blogData, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}blogs/${id}`, {
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

export const deleteBlog = createAsyncThunk(
    'blogs/delete',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}blogs/${id}`, {
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