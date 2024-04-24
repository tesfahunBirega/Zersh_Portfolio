import { createSlice } from "@reduxjs/toolkit"
import { createConversation, deleteConversation, fetchConversation, fetchConversations, updateConversation } from "./conversationAction";

const initialState = {
    conversations: [],
    conversation:{},
    loading: false,
    error: null,
  };
  
export const ConversationSlice = createSlice({
    name:'conversations',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchConversation.pending , (state)=>{
            state.loading = true
        })
        .addCase(fetchConversation.fulfilled, (state,action)=>{
            state.loading = false
            state.conversation = action.payload
        })
        .addCase(fetchConversation.rejected , (state, action)=>{
            state.loading = false 
            state.error = action.error.message
        })
            .addCase(fetchConversations.pending , (state)=>{
                state.loading = true
            })
            .addCase(fetchConversations.fulfilled, (state,action)=>{
                state.loading = false
                state.conversations = action.payload
            })
            .addCase(fetchConversations.rejected , (state, action)=>{
                state.loading = false 
                state.error = action.error.message
            })
            .addCase(createConversation.pending, (state) => {
                state.loading = true;
              })
              .addCase(createConversation.fulfilled, (state, action) => {
                state.loading = false;
                state.conversations.push(action.payload);
              })
              .addCase(createConversation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              })
              .addCase(updateConversation.pending, (state) => {
                state.loading = true;
              })
              .addCase(updateConversation.fulfilled, (state, action) => {
                state.loading = false;
                state.conversations = state.conversations.map((conversation) =>
                  conversation._id === action.payload._id ? action.payload : conversation
                );
              })
              .addCase(updateConversation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              })
              .addCase(deleteConversation.pending, (state) => {
                state.loading = true;
              })
              .addCase(deleteConversation.fulfilled, (state, action) => {
                state.loading = false;
                state.conversations = state.conversations.filter((conversation) => conversation._id !== action.payload._id);
              })
              .addCase(deleteConversation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              });
            
    }
})