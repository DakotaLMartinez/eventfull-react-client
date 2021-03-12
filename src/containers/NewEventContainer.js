import React, { Component } from "react";
import { connect } from "react-redux";
import { createEvent } from "../actions/events";
class NewEventContainer extends Component {
  state = {
    errors: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    // we need to add the data from the form into this formData (FormData) object using the append method
    // When we do this we want to be thinking about how the rails API is expecting the event_params to look.
    formData.append("event[name]", form.name.value);
    formData.append("event[description]", form.description.value);
    formData.append("event[start_time]", form.start_time.value);
    formData.append("event[end_time]", form.end_time.value);
    formData.append("event[location]", form.location.value);
    form.poster.files[0] &&
      formData.append("event[poster]", form.poster.files[0], form.poster.value);
    formData.append("event[group_id]", this.props.match.params.groupId);

    this.props
      .dispatchCreateEvent(formData)
      .then((eventJson) => {
        this.props.history.push(`/groups/${this.props.match.params.groupId}`);
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };

  render() {
    return (
      <form
        className="max-w-4xl w-11/12 mx-auto mt-16 shadow-lg px-8 py-6"
        onSubmit={this.handleSubmit}
      >
        <h1 className="text-3xl text-center font-semibold mb-8">New Event</h1>
        <fieldset className="">
          <label htmlFor="name" className="block uppercase">
            Name{" "}
            <span className="text-red-400">{this.state.errors.name}</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`w-full border-2 p-4 my-4 focus:outline-none focus:ring-2 ${
              this.state.errors.name && "focus:ring-red-400 border-red-400"
            }`}
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="description" className="block uppercase">
            Description{" "}
            <span className="text-red-400">
              {this.state.errors.description}
            </span>
          </label>
          <textarea
            name="description"
            id="description"
            className={`w-full border-2 p-4 my-4 focus:outline-none focus:ring-2 ${
              this.state.errors.description &&
              "focus:ring-red-400 border-red-400"
            }`}
          ></textarea>
        </fieldset>
        <fieldset className="">
          <label htmlFor="start_time" className="block uppercase">
            Start Time{" "}
            <span className="text-red-400">{this.state.errors.start_time}</span>
          </label>
          <input
            type="datetime-local"
            name="start_time"
            id="start_time"
            className={`w-full border-2 p-4 my-4 focus:outline-none focus:ring-2 ${
              this.state.errors.start_time &&
              "focus:ring-red-400 border-red-400"
            }`}
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="end_time" className="block uppercase">
            End Time{" "}
            <span className="text-red-400">{this.state.errors.end_time}</span>
          </label>
          <input
            type="datetime-local"
            name="end_time"
            id="end_time"
            className={`w-full border-2 p-4 my-4 focus:outline-none focus:ring-2 ${
              this.state.errors.end_time && "focus:ring-red-400 border-red-400"
            }`}
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="location" className="block uppercase">
            Location{" "}
            <span className="text-red-400">{this.state.errors.location}</span>
          </label>
          <input
            type="text"
            name="location"
            id="location"
            className={`w-full border-2 p-4 my-4 focus:outline-none focus:ring-2 ${
              this.state.errors.location && "focus:ring-red-400 border-red-400"
            }`}
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="poster" className="block uppercase">
            Poster{" "}
            <span className="text-red-400">{this.state.errors.poster}</span>
          </label>
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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCreateEvent: (formData) => dispatch(createEvent(formData)),
  };
};

export default connect(null, mapDispatchToProps)(NewEventContainer);
