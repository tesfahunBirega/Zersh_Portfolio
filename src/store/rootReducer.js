import { combineReducers } from "redux";
import { blogSlice, blogsSlice } from "./blog/blogSlice";
import { getNotesSlice } from "./note/noteSlice";
import { getOkrSlice, getOkrsSlice } from "./okr/okrSlice";
import { projectSlice } from "./project/projectSlice";
import { CatagorySlice } from "./catagory/catagorySlice";
import { FinancesSlice } from "./finance/financeSlice";
const rootReducer = combineReducers({
  blog:blogSlice.reducer,
  blogs:blogsSlice.reducer,
  notes:getNotesSlice.reducer,
  okr:getOkrSlice.reducer,
  okrs:getOkrsSlice.reducer,
  project:projectSlice.reducer,
  catagories:CatagorySlice.reducer,
  finances:FinancesSlice.reducer
});

export default rootReducer;