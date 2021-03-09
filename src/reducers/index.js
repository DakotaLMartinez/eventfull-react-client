import { combineReducers } from "redux";
import groupsReducer from "./groups";
import eventsReducer from "./events";

export default combineReducers({
  groups: groupsReducer,
  events: eventsReducer
});
