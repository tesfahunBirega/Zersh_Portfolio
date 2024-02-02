import { createSlice } from "@reduxjs/toolkit";
import { createBlog, fetchBlog, fetchBlogs } from "./blogAction";

export const blogSlice = createSlice({
    name:"blog",
    initialState:{
        blog:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchBlog.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchBlog.fulfilled, (state,action)=>{
            state.loading = false
            state.blog=action.payload
        })
        .addCase(fetchBlog.rejected , (state , action )=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const blogsSlice = createSlice({
    name:'blogs',
    initialState:{
        blogs:[],
        blog:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchBlogs.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchBlogs.fulfilled, (state,action)=>{
                state.loading = false
                state.blogs = action.payload
            })
            .addCase(fetchBlogs.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(createBlog.pending, (state) => {
                state.status = 'loading';
              })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogs.push(action.payload);
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
})

