import { combineReducers } from "redux";
import { blogSlice, blogsSlice } from "./blog/blogSlice";
import { getNoteSlice, getNotesSlice } from "./note/noteSlice";
import { getOkrSlice, getOkrsSlice } from "./okr/okrSlice";
const rootReducer = combineReducers({
  blog:blogSlice.reducer,
  blogs:blogsSlice.reducer,
  note:getNoteSlice.reducer,
  notes:getNotesSlice.reducer,
  okr:getOkrSlice.reducer,
  okrs:getOkrsSlice.reducer
});

export default rootReducer;