import {
  START_LOADING_GROUPS,
  START_LOADING_GROUP,
  SUCCESSFULLY_LOADED_GROUPS,
  SUCCESSFULLY_LOADED_GROUP_EVENTS,
  SUCCESSFULLY_CREATED_GROUP,
} from ".";

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

export const fetchGroup = (groupId) => {
  return (dispatch) => {
    dispatch({ type: START_LOADING_GROUP, payload: groupId });
    fetch(`http://localhost:3001/groups/${groupId}`)
      .then((res) => res.json())
      .then((groupEventsJson) => {
        dispatch({
          type: SUCCESSFULLY_LOADED_GROUP_EVENTS,
          payload: groupEventsJson
        })
      });
  };
};

export const createGroup = (formData) => {
  return (dispatch) => {
    return fetch('http://localhost:3001/groups', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({group: formData})
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then(errors => Promise.reject(errors))
        }
      })
      .then(groupJson => {
        dispatch({
          type: SUCCESSFULLY_CREATED_GROUP,
          payload: groupJson
        });
      })
  }
}