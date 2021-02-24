import React, { Component } from 'react'
import GroupsList from '../components/GroupsList';

export default class GroupsIndexContainer extends Component {

  state = {
    groups: [],
    loading: true
  }

  componentDidMount() {
    // we'd probably want to store the API_URL in an environment variable 
    // so this would work in deployment as well but for now we'll hard code the hostname
    fetch('http://localhost:3001/groups', { 
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(groupsJson => {
        console.log('groups', groupsJson)
        this.setState({
          groups: groupsJson,
          loading: false
        })
      })
  }

  render() {
    return (
      <section className="max-w-6xl w-11/12 mx-auto mt-16">
        {this.state.loading ? 'loading spinner' : <GroupsList groups={this.state.groups} /> }
      </section>
    )
  }
}