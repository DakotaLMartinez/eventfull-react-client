import { SUCCESSFULLY_CREATED_EVENT } from '.'
export const createEvent = (formData) => {
  return (dispatch) =>  {
    return fetch('http://localhost:3001/events', {
      method: 'POST',
      body: formData
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then(errors => Promise.reject(errors))
        }
      })
      .then(eventJson => {
        dispatch({
          type: SUCCESSFULLY_CREATED_EVENT,
          payload: eventJson
        })
      })
  }
}