# EventFull React Client

```bash
npx create-react-app eventfull-react-client
```

## Setting up React Router

```bash
yarn add react-router-dom
```

Clear out the boilerplate from 'create-react-app'.

- Remove the index.css file, logo.svg, reportWebVitals, setupTests.js and App.css and App.test.js.
- Remove logos from public folder.
- Remove all references in index.js and App.js to the removed files
- Clear out the App component so it's empty
- Run `yarn start` to make sure the server boots up and we see an empty screen

Now that we've cleaned house, we can add our routes.

So in `App.js`, we're going to want to import some components from react-router-dom:

```js
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
```

We could put our navbar directly into app, but it might be better to create another file for it and make it a component. So, let's think about our directory for the app:

```
src/App.js
src/index.js
src/components
src/containers
src/ui
```

Later, when we add `redux` we'll want to add a couple of additional directories for `actions` and `reducers`. In a small app like this we can just have this simple directory structure that isn't many layers deep. But, if we had a situation where our app had 100s of components, we might want to think about grouping them differently and maybe having subdirectories for sections of the application. For example:

```
src/groups/containers
src/groups/components
src/events/containers
src/events/components
```

For this project having something like this would work fine:

```
src/index.js
src/app.js
src/actions/
src/components/
src/containers/
src/reducers/
```

We're starting with groups, we'll want to have our containers and components directories. So we can make those now

```bash
mkdir src/containers
mkdir src/components
```

Next, we can add the 4 components we'll need:

```bash
touch src/containers/GroupsIndexContainer.js
touch src/containers/GroupFormContainer.js
touch src/components/GroupsList.js
touch src/components/GroupListItem.js
```

We want to make things look nice, so let's add tailwindcss to the public/index.html file. You'll want to add this line to the `<head>` tag in the `index.html` file.

```html
<link
  href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
  rel="stylesheet"
/>
```

Now we'll be able to use tailwind classes within our react components.

We're going to have a container component (one that has state/is connected to our redux store when we have one) connected to each of our RESTful routes. Because we're going to have routes for the containers, we need to import them into App.js.

```js
import GroupsIndexContainer from "./containers/GroupsIndexContainer";
import GroupFormContainer from "./containers/GroupFormContainer";
```

Then, we need to add a switch statement to the App function's returned jsx:

```js
<Router>
  <Switch>
    <Route exact path="/">
      Groups
    </Route>
    <Route path="/groups/new">New Group</Route>
  </Switch>
</Router>
```

In order to make better use of this, we want to have a navbar as well, so that users can navigate from route to route more easily. So let's add that within the router and let's also add some classes to indicate which route is currently active.

```js
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import GroupsIndexContainer from "./containers/GroupsIndexContainer";
import GroupFormContainer from "./containers/GroupFormContainer";

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
            Groups
          </Route>
          <Route path="/groups/new">New Group</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
```

Now that we have these routes set up, let's hook them up to the components.

```

```

Let's add our GroupsIndexContainer

```js
import React, { Component } from "react";

export default class GroupsIndexContainer extends Component {
  state = {
    groups: [],
    loading: true,
  };

  render() {
    return (
      <section className="max-w-6xl mx-auto mt-16">
        {this.state.loading ? (
          "loading spinner"
        ) : (
          <GroupsList groups={this.state.groups} />
        )}
      </section>
    );
  }
}
```

Now, to simulate the loading process, we can introduce componentDidMount and add our GroupsList component

```js
import React, { Component } from "react";
import GroupsList from "../components/GroupsList";

export default class GroupsIndexContainer extends Component {
  state = {
    groups: [],
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        groups: [
          { name: "software-engineering-052620" },
          { name: "software-engineering-071519" },
        ],
        loading: false,
      });
    }, 1000);
  }

  render() {
    return (
      <section className="max-w-6xl mx-auto mt-16">
        {this.state.loading ? (
          "loading spinner"
        ) : (
          <GroupsList groups={this.state.groups} />
        )}
      </section>
    );
  }
}
```

```js
import React from "react";

const GroupsList = ({groups}) => {
  return (
    <>
      <h1>GroupsList</h1>
      <ul>
        {groups.map(group =>)}
      </ul>
    </>
  );
};

export default GroupsList;
```

In seed:

```
group1 = Group.find_or_create_by(name: 'software-engineering-052620')
group2 = Group.find_or_create_by(name: 'software-engineering-071519')
```

```
rails db:seed
```

We can take our componentDidMount in the GroupsIndexContainer and make it actually fetch data from the API

```js

```

If you see an error like this:

```
GroupsIndexContainer.js:14 GET http://localhost:3000/groups 404 (Not Found)
componentDidMount @ GroupsIndexContainer.js:14
commitLifeCycles @ react-dom.development.js:20663
commitLayoutEffects @ react-dom.development.js:23426
callCallback @ react-dom.development.js:3945
invokeGuardedCallbackDev @ react-dom.development.js:3994
invokeGuardedCallback @ react-dom.development.js:4056
commitRootImpl @ react-dom.development.js:23151
unstable_runWithPriority @ scheduler.development.js:646
runWithPriority$1 @ react-dom.development.js:11276
commitRoot @ react-dom.development.js:22990
performSyncWorkOnRoot @ react-dom.development.js:22329
(anonymous) @ react-dom.development.js:11327
unstable_runWithPriority @ scheduler.development.js:646
runWithPriority$1 @ react-dom.development.js:11276
flushSyncCallbackQueueImpl @ react-dom.development.js:11322
flushSyncCallbackQueue @ react-dom.development.js:11309
discreteUpdates$1 @ react-dom.development.js:22420
discreteUpdates @ react-dom.development.js:3756
dispatchDiscreteEvent @ react-dom.development.js:5889
localhost/:1 Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0
```

Check the network tab and see this:

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /groups</pre>
</body>
</html>
```

When you see this:

```
localhost/:1 Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0
```

That's a signal that you've got code that's trying to parse an html file as JSON.

In our case we made a request to the port running our react dev server not the one running our api. So when we boot up the rails api, we need to run it on a separate port.

```bash
rails s -p 3001
```

Now we can update our url to localhost:3001 and we should get something better.

If we visit : http://localhost:3001/groups

we should see

```json
[
  {
    "id": 1,
    "name": "software-engineering-052620",
    "created_at": "2021-02-24T00:36:06.684Z",
    "updated_at": "2021-02-24T00:36:06.684Z"
  },
  {
    "id": 2,
    "name": "software-engineering-071519",
    "created_at": "2021-02-24T00:36:06.698Z",
    "updated_at": "2021-02-24T00:36:06.698Z"
  }
]
```
