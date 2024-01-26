import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBlog = createAsyncThunk(
    'blogs/fetchbyid',
    async(blogId, thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`api/blog/${blogId}` , {
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

        const response = await fetch(`api/blogs` , {
            signal:abortController.signal
        })
        if(response.status !== 200){
            abortController.abort()
            return thinkApi.rejectWithValue("Failed to fetch blogs data.")
        }

        return await response.json()
    }
)