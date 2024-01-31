import { combineReducers, configureStore, createListenerMiddleware } from "@reduxjs/toolkit"
import { blogSlice, blogsSlice } from "./blog/blogSlice";
import { getNoteSlice, getNotesSlice } from "./note/noteSlice";

const rootReducer = combineReducers({
  blog: blogSlice.reducer,
  blogs: blogsSlice.reducer,
  note:getNoteSlice.reducer,
  notes:getNotesSlice.reducer
});

const listenerMiddlewareInstance = createListenerMiddleware({
  onError: () => console.error,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddlewareInstance.middleware),
});

export { store };