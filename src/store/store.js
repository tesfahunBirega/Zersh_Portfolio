// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "./rootReducer";

import { combineReducers, configureStore, createListenerMiddleware } from "@reduxjs/toolkit"
import { blogSlice, blogsSlice } from "./blog/blogSlice";

// const initialState = {};
// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );
// export default store;

const rootReducer = combineReducers({
  blog: blogSlice.reducer,
  blogs: blogsSlice.reducer,
});

// Instantiate the listener middleware
const listenerMiddlewareInstance = createListenerMiddleware({
  onError: () => console.error,
});

// Configure the store with the rootReducer and middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddlewareInstance.middleware),
});

export { store };