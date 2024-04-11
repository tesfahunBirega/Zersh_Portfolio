import { createSlice } from "@reduxjs/toolkit"
import { createProject, deleteProject, fetchProject, fetchProjects, updateProject } from "./projectAction"

export const projectSlice = createSlice({
    name:'projects',
    initialState:{
        projects:[],
        project:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProject.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchProject.fulfilled, (state,action)=>{
            state.loading = false
            state.project=action.payload
        })
        .addCase(fetchProject.rejected , (state , action )=>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(fetchProjects.pending , (state)=>{
            state.loading = true
        })
        .addCase(fetchProjects.fulfilled, (state,action)=>{
            state.loading = false
            state.projects = action.payload
        })
        .addCase(fetchProjects.rejected , (state, action)=>{
            state.loading = false 
            state.error = action.error.message
        })
        .addCase(createProject.pending, (state) => {
            state.loading = true;
          })
        .addCase(createProject.fulfilled, (state, action) => {
            state.loading = false;
            state.projects.push(action.payload);
        })
        .addCase(createProject.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateProject.pending, (state) => {
            state.loading = true;
          })
        .addCase(updateProject.fulfilled, (state, action) => {
            state.loading = false;
            state.projects=state.projects.forEach(item=> item._id ==action.payload._id ? action.payload:item);
        })
        .addCase(updateProject.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteProject.pending, (state) => {
            state.loading = true;
          })
        .addCase(deleteProject.fulfilled, (state, action) => {
            state.loading = false;
            state.projects=state.projects.filter(item=>item._id!= action.payload._id);
        })
        .addCase(deleteProject.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            
            
    }
})

