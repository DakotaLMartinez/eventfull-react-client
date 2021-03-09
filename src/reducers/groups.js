import {
  ADD_GROUP,
  START_LOADING_GROUPS,
  START_LOADING_GROUP,
  SUCCESSFULLY_LOADED_GROUPS,
  FAILED_LOADING_GROUPS,
  SUCCESSFULLY_LOADED_GROUP_EVENTS,
} from "../actions";
const initialState = {
  loadingState: "notStarted",
  list: [],
};

export default function groupsReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING_GROUPS:
      return { ...state, loadingState: "inProgress" };
    case SUCCESSFULLY_LOADED_GROUPS:
      return {
        list: action.payload,
        groupsLoadingState: "successful",
      };
    case SUCCESSFULLY_LOADED_GROUP_EVENTS:
      const foundGroup = state.list.find(group => group.id == action.payload.group.id)
      if (foundGroup) {
        return state
      } else {
        return {
          ...state,
          list: state.list.concat(action.payload.group),
        };
      }
    default:
      return state;
  }
}
