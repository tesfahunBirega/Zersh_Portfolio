import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants";
import axios from "axios";
import {
  message,
} from "antd";

export const fetchNote = createAsyncThunk(
    'note/fetchbyid',
    async(noteId, thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}notes/${noteId}` , {
            signal:abortController.signal
        })
        if(response.status !== 200){
            abortController.abort()
            return thinkApi.rejectWithValue("Failed to fetch note data.")
        }

        return await response.json()
    }
)

export const fetchNotes = createAsyncThunk(
    'notes',
    async(thinkApi)=>{

        const abortController = new AbortController()

        const response = await fetch(`${baseUrl}notes` 
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
    console.log(noteData ,"noteData");
    try {
      const response = await axios.post(`${baseUrl}notes`, noteData);
     
      message.success("Note created successfully");
      return  response.data;
    } catch (error) {
      message.error(`Note create Failed! ${error.message}`);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const updateNote = createAsyncThunk(
    'notes/update',
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await fetch(`${baseUrl}notes/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.noteData),
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