import { combineReducers } from "redux";
import { blogSlice, blogsSlice } from "./blog/blogSlice";

const rootReducer = combineReducers({
    blog: blogSlice.reducer,
    blogs: blogsSlice.reducer,
  });

export default rootReducer;