import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants";

export const fetchNote = createAsyncThunk(
    'note/fetchbyid',
    async(noteId, thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}notes/${noteId}` , {
            signal:abortController.signal
        })
        if(response.status !== 200){
            abortController.abort()
            return thinkApi.rejectWithValue("Failed to fetch user data.")
        }

        return await response.json()
    }
)

export const fetchNotes = createAsyncThunk(
    'notes',
    async(thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}note` 
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
