import { combineReducers } from "redux";
import groupsReducer from "./groups";

export default combineReducers({
  groups: groupsReducer,
});
