import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import GroupsIndexContainer from './containers/GroupsIndexContainer';
import GroupFormContainer from './containers/GroupFormContainer';
import NewEventContainer from './containers/NewEventContainer';
import GroupShowContainer from "./containers/GroupShowContainer";

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="text-center bg-blue-900 text-yellow-100 p-4">
          <NavLink
            className="inline-block px-4 py-2"
            activeClassName="text-yellow-300"
            exact
            to="/"
          >
            Groups
          </NavLink>
          <NavLink
            className="inline-block px-4 py-2"
            activeClassName="text-yellow-300"
            to="/groups/new"
          >
            New Group
          </NavLink>
        </nav>
        <Switch>
          <Route exact path="/">
            <GroupsIndexContainer />
          </Route>
          <Route path="/groups/new" component={GroupFormContainer} />
          <Route
            path="/groups/:groupId/events/new"
            component={NewEventContainer}
          />
          <Route
            path="/groups/:groupId"
            component={GroupShowContainer}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
