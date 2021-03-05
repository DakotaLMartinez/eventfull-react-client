import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGroups } from "../actions/groups";
import GroupsList from "../components/GroupsList";

class GroupsIndexContainer extends Component {

  componentDidMount() {
    // we'd probably want to store the API_URL in an environment variable
    // so this would work in deployment as well but for now we'll hard code the hostname
    this.props.dispatchFetchGroups();
  }

  render() {
    if (this.props.loadingState === "notStarted") {
      return null
    }
    return (
      <section className="max-w-6xl w-11/12 mx-auto mt-16">
        {this.props.loadingState === "inProgress" ? (
          "loading spinner"
        ) : (
          <GroupsList groups={this.props.groups} />
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups.list,
    loadingState: state.groups.loadingState
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    dispatchFetchGroups: () => dispatch(fetchGroups())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsIndexContainer)
