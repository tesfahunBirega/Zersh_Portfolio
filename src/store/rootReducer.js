import { combineReducers } from "redux";
import { blogSlice, blogsSlice } from "./blog/blogSlice";
import { getNotesSlice } from "./note/noteSlice";
import { getOkrSlice, getOkrsSlice } from "./okr/okrSlice";
import { projectSlice } from "./project/projectSlice";
const rootReducer = combineReducers({
  blog:blogSlice.reducer,
  blogs:blogsSlice.reducer,
  notes:getNotesSlice.reducer,
  okr:getOkrSlice.reducer,
  okrs:getOkrsSlice.reducer,
  project:projectSlice.reducer
});

export default rootReducer;