import { createSlice } from "@reduxjs/toolkit";
import { createNote, deleteNote, fetchNote, fetchNotes, updateNote } from "./noteAction";

export const getNotesSlice = createSlice({
    name:'notes',
    initialState:{
        notes:[],
        note:{},
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchNotes.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchNotes.fulfilled, (state,action)=>{
                state.loading = false
                state.notes = action.payload
            })
            .addCase(fetchNotes.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(fetchNote.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchNote.fulfilled, (state,action)=>{
                state.loading = false
                state.note = action.payload
            })
            .addCase(fetchNote.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(createNote.pending , (state)=>{
                state.loading = true
            })
            .addCase(createNote.fulfilled, (state,action)=>{
                state.loading = false
                state.notes.push(action.payload)
            })
            .addCase(createNote.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(updateNote.pending , (state)=>{
                state.loading = true 
            })
            .addCase(updateNote.fulfilled , (state, action)=>{
                state.loading = false 
                state.notes =  state.notes.map((item) => item._id == action.payload._id ? action.payload : item)
            })
            .addCase(updateNote.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(deleteNote.pending , (state)=>{
                state.loading = true
            })
            .addCase(deleteNote.fulfilled, (state,action)=>{
                state.loading = false
                state.notes=state.notes.filter(item=>item._id!= action.payload._id)
            })
            .addCase(deleteNote.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
    }
})

