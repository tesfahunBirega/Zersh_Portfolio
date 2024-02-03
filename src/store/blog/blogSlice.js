import { createSlice } from "@reduxjs/toolkit";
import { createBlog, deleteBlog, fetchBlog, fetchBlogs, updateBlog } from "./blogAction";

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
        status:null,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBlog.pending,(state)=>{
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
            })
            .addCase(updateBlog.pending, (state) => {
                state.status = 'loading';
              })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogs.push(action.payload);
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.status = 'loading';
              })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogs=state.blogs.filter(item=>item._id!= action.payload._id);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            
            
    }
})

