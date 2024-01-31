import { createSlice } from "@reduxjs/toolkit";
import { fetchNote, fetchNotes } from "./noteAction";

export const getOkrSlice = createSlice({
    name:"note",
    initialState:{
        note:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchNote.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchNote.fulfilled, (state,action)=>{
            state.loading = false
            state.blog=action.payload
        })
        .addCase(fetchNote.rejected , (state , action )=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const getOkrsSlice = createSlice({
    name:'okrs',
    initialState:{
        goals:[],
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
                state.blogs = action.payload
            })
            .addCase(fetchNotes.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
    }
})

