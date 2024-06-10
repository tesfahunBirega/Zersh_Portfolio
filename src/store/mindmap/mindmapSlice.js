import { createSlice } from "@reduxjs/toolkit";
import { createMindmap, deleteMindmap, fetchMindmap, fetchMindmaps, updateMindmap } from "./mindmapAction";

export const mindmapSlice = createSlice({
    name: "mindmap",
    initialState: {
        mindmaps: [],
        mindmap:{},
        loading: false,
        loading:false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMindmap.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMindmap.fulfilled, (state, action) => {
                state.loading = false;
                state.mindmap = action.payload;
            })
            .addCase(fetchMindmap.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMindmaps.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMindmaps.fulfilled, (state, action) => {
                state.loading = false;
                state.mindmaps = action.payload;
            })
            .addCase(fetchMindmaps.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createMindmap.pending, (state) => {
                state.loading = true
            })
            .addCase(createMindmap.fulfilled, (state, action) => {
                state.loading = false;
                state.mindmaps.push(action.payload);
            })
            .addCase(createMindmap.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateMindmap.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateMindmap.fulfilled, (state, action) => {
                state.loading = false;
                const updatedMindmapIndex = state.mindmaps.findIndex(mindmap => mindmap._id === action.payload._id);
                if (updatedMindmapIndex !== -1) {
                    state.mindmaps[updatedMindmapIndex] = action.payload;
                }
            })
            .addCase(updateMindmap.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteMindmap.pending, (state) => {
                state.loading = false;
            })
            .addCase(deleteMindmap.fulfilled, (state, action) => {
                state.loading = false;
                state.mindmaps = state.mindmaps?.filter(mindmap => mindmap._id !== action.payload._id);
            })
            .addCase(deleteMindmap.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});
