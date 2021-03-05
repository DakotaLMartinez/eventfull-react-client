import {
  START_LOADING_GROUPS,
  SUCCESSFULLY_LOADED_GROUPS
} from '.';

export const fetchGroups = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING_GROUPS})
    fetch("http://localhost:3001/groups", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((groupsJson) => {
        dispatch({
          type: SUCCESSFULLY_LOADED_GROUPS,
          payload: groupsJson
        })
      });
  }
}