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
            return thinkApi.rejectWithValue("Failed to fetch notes data.")
        }

        return await response.json()
    }
)



export const createNote = createAsyncThunk(
    'notes/create',
  async (noteData, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept":"*/*"
        },
        body: noteData,
      });
      console.log(response , "response");
      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const updateNote = createAsyncThunk(
    'notes/update',
  async (id,noteData, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}notes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const deleteNote = createAsyncThunk(
    'notes/delete',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)