import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchGroup } from "../actions/groups";

class GroupShowContainer extends Component {
  state = {
    group: {},
    events: [],
    loading: true,
  };

  componentDidMount() {
    const groupId = this.props.match.params.groupId;
    this.props.dispatchFetchGroup(groupId);
  }

  render() {
    if (this.props.loadingState !== "successful") {
      return <div>Loading Spinner</div>;
    }
    return (
      <section className="max-w-6xl w-11/12 mx-auto mt-16">
        <h1 className="text-3xl font-bold text-center mb-8">
          {this.props.group.name}
        </h1>
        <p className="my-2">
          <Link to={`/groups/${this.props.group.id}/events/new`}>
            Add an Event
          </Link>
        </p>
        <div className="grid grid-cols-3">
          {this.props.events.map((event) => (
            <figure className="p-4 shadow">
              <img className="" alt={event.name} src={event.poster_url} />
              <h2>{event.name}</h2>
              <p>{event.start_time}</p>
              <p>{event.end_time}</p>
              <p>{event.location}</p>
              {/* Later we'll add a spoiler here to show the description */}
            </figure>
          ))}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, { match } ) => {
  const groupId = match.params.groupId
  let loadingState = state.events.groupsLoaded[groupId] || "notStarted"
  return {
    group: state.groups.list.find(group => group.id == groupId),
    events: state.events.list.filter(event => event.group_id == groupId),
    loadingState
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFetchGroup: (groupId) => dispatch(fetchGroup(groupId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupShowContainer);
