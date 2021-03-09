import {
  SUCCESSFULLY_LOADED_GROUP_EVENTS,
  START_LOADING_GROUP,
} from "../actions";

const initialState = {
  groupsLoaded: {},
  list: [],
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING_GROUP:
      return {
        ...state,
        groupsLoaded: { ...state.groupsLoaded, [action.payload]: "inProgress" },
      };
    case SUCCESSFULLY_LOADED_GROUP_EVENTS:
      return {
        groupsLoaded: {
          ...state.groupsLoaded,
          [action.payload.group.id]: "successful",
        },
        list: state.list.concat(action.payload.events),
      };
    default:
      return state;
  }
}
