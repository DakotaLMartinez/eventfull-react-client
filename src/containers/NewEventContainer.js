import React, { Component } from 'react'

export default class NewEventContainer extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const body = new FormData();
    // we need to add the data from the form into this body (FormData) object using the append method
    // When we do this we want to be thinking about how the rails API is expecting the event_params to look.
    body.append("event[name]", form.name.value);
    body.append("event[description]", form.description.value);
    body.append("event[start_time]", form.start_time.value);
    body.append("event[end_time]", form.end_time.value);
    body.append("event[location]", form.location.value);
    body.append("event[poster]", form.poster.files[0], form.poster.value);
    body.append("event[group_id]", this.props.match.params.groupId)

    fetch("http://localhost:3001/events", {
      method: "post",
      body
    })
      .then(res => res.json())
      .then(eventJson => {
        this.props.history.push(`/groups/${this.props.match.params.groupId}`);
      })
  }

  render() {
    return (
      <form
        className="max-w-4xl w-11/12 mx-auto mt-16 shadow-lg px-8 py-6"
        onSubmit={this.handleSubmit}
      >
        <h1 className="text-3xl text-center font-semibold mb-8">New Event</h1>
        <fieldset className="">
          <label htmlFor="name" className="block uppercase">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full border-2 p-4 my-4"
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="description" className="block uppercase">
            Description
          </label>
          <textarea
            className="w-full border-2 p-4 my-4"
            name="description"
            id="description"
          ></textarea>
        </fieldset>
        <fieldset className="">
          <label htmlFor="start_time" className="block uppercase">
            Start Time
          </label>
          <input
            type="datetime-local"
            name="start_time"
            id="start_time"
            className="w-full border-2 p-4 my-4"
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="end_time" className="block uppercase">
            End Time
          </label>
          <input
            type="datetime-local"
            name="end_time"
            id="end_time"
            className="w-full border-2 p-4 my-4"
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="location" className="block uppercase">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            className="w-full border-2 p-4 my-4"
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="poster" className="block uppercase">Poster</label>
          <input
            type="file"
            className="w-full my-4"
            name="poster"
            id="poster"
          />
        </fieldset>
        <button
          type="submit"
          className="w-full p-4 bg-blue-300 mt-4 hover:bg-blue-400 transition-all duration-200"
        >
          Add Event
        </button>
      </form>
    );
  }
}