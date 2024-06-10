import { combineReducers } from "redux";
import { blogSlice, blogsSlice } from "./blog/blogSlice";
import { getNotesSlice } from "./note/noteSlice";
import { getOGoalsSlice,  } from "./okr/goalSlice";
import { projectSlice } from "./project/projectSlice";
import { CatagorySlice } from "./catagory/catagorySlice";
import { FinancesSlice } from "./finance/financeSlice";
import { ConversationSlice } from "./conversation/conversationSlice";
import { businessPlanSlice } from "./bussinessPlan/bussinessPlanSlince";
import { mindmapSlice } from "./mindmap/mindmapSlice";
const rootReducer = combineReducers({
  blog:blogSlice.reducer,
  blogs:blogsSlice.reducer,
  notes:getNotesSlice.reducer,
  goal:getOGoalsSlice.reducer,
  project:projectSlice.reducer,
  catagories:CatagorySlice.reducer,
  finances:FinancesSlice.reducer,
  conversations:ConversationSlice.reducer,
  bussinessPlan:businessPlanSlice.reducer,
  mindmaps:mindmapSlice.reducer


});

export default rootReducer;