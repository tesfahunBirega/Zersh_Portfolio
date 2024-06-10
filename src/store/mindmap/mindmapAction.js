import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants";

export const fetchMindmap = createAsyncThunk(
    'mindmaps/fetchbyid',
    async(mindmapId, thunkApi) => {

        const abortController = new AbortController();

        const response = await fetch(`${baseUrl}mindmaps/${mindmapId}`, {
            signal: abortController.signal
        });

        if(response.status !== 200){
            abortController.abort();
            return thunkApi.rejectWithValue("Failed to fetch mindmap data.");
        }

        return await response.json();
    }
);

export const fetchMindmaps = createAsyncThunk(
    'mindmaps',
    async(thunkApi) => {

        const abortController = new AbortController();

        const response = await fetch(`${baseUrl}mindmaps`, {
            signal: abortController.signal
        });

        if(response.status !== 200){
            abortController.abort();
            return thunkApi.rejectWithValue("Failed to fetch mindmaps data.");
        }

        return await response.json();
    }
);

export const createMindmap = createAsyncThunk(
    'mindmaps/create',
    async (mindmapData, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}mindmaps`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mindmapData),
            });

            if (!response.ok) {
                let errorDetail = 'Failed to create mindmap!';
                try {
                    const errorResponse = await response.json();
                    errorDetail = errorResponse.message || errorDetail;
                } catch (parseError) {
                    // Fallback to generic error message if parsing fails
                }
                throw new Error(errorDetail);
            }

            return await response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateMindmap = createAsyncThunk(
    'mindmaps/update',
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}mindmaps/${data.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data.mindmapData),
            });

            if (!response.ok) {
                throw new Error('Failed to update mindmap');
            }

            return await response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteMindmap = createAsyncThunk(
    'mindmaps/delete',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}mindmaps/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete mindmap');
            }

            return await response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
