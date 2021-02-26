# EventFull React Client

## Part 2

The video for this part of the series starts with a discussion of the [plan for the components](https://docs.google.com/spreadsheets/d/1PHFT9h7G_f735wu_FplfiZcQXXxMj4fyPCkSkp6kDOY/edit#gid=465327345) we're going to build out during this lesson.

We're basing our plan on the client side routes that our application will have and how they will be structured. To build our plan, we need to answer the following questions:

- What path will be visible in the URL bar?
- What API endpoints are involved?
- What React component(s) will be rendered?

Then for each of the components in the last answer, address the following conerns:

- What state do we need for this component?
- What props do we need for this component?
- Do we need componentDidMount (or useEffect) here? If so, what is it that should happen after the component renders?
- What event handlers are required? Will the listener(s) be attached in this component or will the handler(s) be passed as props to child components?
- What possible values for state and props will affect the rendered content?

I've added those to [this spreadsheet](https://docs.google.com/spreadsheets/d/1PHFT9h7G_f735wu_FplfiZcQXXxMj4fyPCkSkp6kDOY/edit#gid=465327345) that you can copy and use for your own purposes.

We get started writing code at around the 14:30 mark in the video. We start by creating the client:

```bash
npx create-react-app eventfull-react-client
```

Then we set up a [remote repo](https://github.com/DakotaLMartinez/eventfull-react-client) that we connect to it. The way I'm using GitHub for this project is I'm creating a branch for the start and end of each video and pushing both to GitHub (for the rails api repo and the react client repo). So, if you're jumping into the middle of the tutorial, just clone the repo and checkout that branch for the start of that part of the series.

Because the plan we made is focused on client side routes, the first thing we're going to do is add the react router library.

## Setting up React Router

```bash
yarn add react-router-dom
```

But, before we start filling out our routes and components, let's clear out the boilerplate from `create-react-app`.

- Remove the index.css file, logo.svg, reportWebVitals, setupTests.js and App.css and App.test.js.
- Remove logos from public folder.
- Remove all references in index.js and App.js to the removed files
- Clear out the App component so it's empty
- Run `yarn start` to make sure the server boots up and we see an empty screen

Now that we've cleaned house, we can add our routes. So, in `App.js`, we're going to want to import some components from [react-router-dom](https://reactrouter.com/web/guides/quick-start).

```js
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
```

Later on, we're going to split off the navigation into a separate component, but we'll keep it in App for the moment.

## A Brief Aside About Directory Structure

Before we move too far forward, let's have a conversation about directory structure. For an app of the size we're going to build, we could approach is:

```bash
src/App.js
src/index.js
src/components/
src/containers/
src/ui/
```

Later, when we add `redux` we'll want to add a couple of additional directories for `actions` and `reducers`. In a small app like this we can just have this simple directory structure that isn't many layers deep. But, if we had a situation where our app had 100s of components, we might want to think about grouping them differently and maybe having subdirectories for sections of the application. For example:

```bash
src/groups/containers/
src/groups/components/
src/events/containers/
src/events/components/
```

For this project having something like this would work fine:

```bash
src/index.js
src/app.js
src/actions/
src/components/
src/containers/
src/reducers/
```

Since we're starting with groups, we'll want to have our containers and components directories. So we can make those now

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

Now we'll be able to use tailwind classes within our react components. We're going to have a container component (one that has state/is connected to our redux store when we have one) connected to each of our RESTful routes. Because we're going to have routes for the containers, we need to import them into App.js.

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

In order to make better use of these routes, we want to have a navbar as well, so that users can navigate from route to route more easily. So let's add that within the router and let's also add some classes to indicate which route is currently active. We pass the `active` prop to the `NavLink` tag to ensure that the `activeClassName` is only applied to that `NavLink` if the route exactly matches the url.

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
            exact
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

```js
<Switch>
  <Route exact path="/">
    <GroupsIndexContainer />
  </Route>
  <Route path="/groups/new">
    <GroupFormContainer />
  </Route>
</Switch>
```

If we try this out in the browser, we'll see an error that looks like this:

```text
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

Check the render method of `App`.
```

If you see an error like this, it could be caused by any of the possible explanations mentioned in the last sentence there. But, I've found when it happens to me it's usually that I haven't actually exported from the file I'm importing from yet. In this case, that's what the problem is, so let's add our GroupsIndexContainer and make it the default export.

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
        {this.state.loading
          ? "loading spinner"
          : "<GroupsList groups={this.state.groups} />"}
      </section>
    );
  }
}
```

Now, to simulate the loading process, we can introduce componentDidMount and add our GroupsList component. To simulate the loading time, we can use `setTimeout` and run the setState after a second has passed.

```js
// src/containers/GroupsIndexContainer.js
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

Here's what the `GroupsList` component will look like.

```js
// src/components/GroupsList.js
import React from "react";
import GroupListItem from "./GroupListItem";

const GroupsList = ({ groups }) => {
  return (
    <>
      <h1>GroupsList</h1>
      <ul>
        {groups.map((group) => (
          <GroupListItem key={group.id} group={group} />
        ))}
      </ul>
    </>
  );
};

export default GroupsList;
```

This component will accept `groups` as a prop, so we're destructuring that here in the arguments list. We'll be iterating over the groups and rendering a list item for each, so here's that component:

```js
// src/components/GroupListItem.js
import React from "react";

const GroupListItem = ({ group }) => {
  return (
    <li className="" key={group.id}>
      {group.name}
    </li>
  );
};

export default GroupListItem;
```

We'll be adding some classes here later to make it look a little nicer, but for now we're just adding the prop so we can pull them in later.

Next, we want to set this up so we can actually test this out. In order to do that, we need some data in our database so we can fetch it from the API.

## Adding Some Seeds

In db/seeds.rb, add the following lines:

```rb
# db/seeds.rb
group1 = Group.find_or_create_by(name: 'software-engineering-052620')
group2 = Group.find_or_create_by(name: 'software-engineering-071519')
```

Then to add these, run:

```
rails db:seed
```

We can check in Postico that these records have indeed been added (or you can just use `rails console` if you like). After you've made sure that you've got these records in the db, we can move on to fetching it from the API in our react components.

## Fetching From the API in componentDidMount

We can take our componentDidMount in the GroupsIndexContainer and make it actually fetch data from the API

```js
componentDidMount() {
  // we'd probably want to store the API_URL in an environment variable
  // so this would work in deployment as well but for now we'll hard code the hostname
  fetch('http://localhost:3000/groups', {
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

You can check the network tab in the chrome console and see what it shows you. In our case it looks like this:

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

That's a signal that you've got some code that's trying to parse an html file as JSON. In particular, if you've got a fetch call that returns a promise for a response and you try to parse that response as JSON but it's in fact in HTML format, this will be the error that you'll see.

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

So, if we update the url to be `http://localhost:3001/groups` instead of `http://localhost:3000/groups`.

```js
// src/containers/GroupsIndexContainer.js
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
```

Now, when we load up the page in the browser, we should see the 2 groups appear on the page. We

## Adding the New Group Form

Now, we're going to be adding in our `GroupFormContainer`

```js
// src/containers/GroupFormContainer
import React, { Component } from "react";

export default class GroupFormContainer extends Component {
  state = {
    name: "",
  };

  render() {
    return (
      <form className="max-w-6xl w-3/4 mx-auto mt-16 shadow-lg px-4 py-6">
        <h1 className="text-center text-3xl font-semibold mb-2">New Group</h1>
        <fieldset>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Name your group"
            className="w-full border p-4 my-4"
          />
        </fieldset>
        <button
          className="w-full p-4 bg-blue-300 mt-4 hover:bg-blue-400 transition-all duration-200"
          type="submit"
        >
          Add Group
        </button>
      </form>
    );
  }
}
```

Also, we need to hook this component up to the route we built earlier in App.js.

```js
// src/App.js
// ...
<Switch>
  <Route exact path="/">
    <GroupsIndexContainer />
  </Route>
  <Route path="/groups/new">
    <GroupFormContainer />
  </Route>
</Switch>
```

Now, we'll be able to see the form in the browser when we visit the appropriate route. But, if we do it now, we won't be able to interact with the from yet. To get that working, we'll need to add the event listeners to our component.

```js
// src/containers/GroupFormContainer.js
import React, { Component } from "react";

export default class GroupFormContainer extends Component {
  state = {
    name: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/groups", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ group: this.state }),
    })
      .then((res) => res.json())
      .then((groupJson) => {
        this.props.history.push("/");
      });
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="max-w-6xl w-3/4 mx-auto mt-16 shadow-lg px-4 py-6"
      >
        <h1 className="text-center text-3xl font-semibold mb-2">New Group</h1>
        <fieldset>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Name your group"
            className="w-full border p-4 my-4"
          />
        </fieldset>
        <button
          className="w-full p-4 bg-blue-300 mt-4 hover:bg-blue-400 transition-all duration-200"
          type="submit"
        >
          Add Group
        </button>
      </form>
    );
  }
}
```

For `handleChange`, we make that an arrow function so that we can access the `setState` method when that event handler gets called. If we define it as an arrow function, then we won't need to bind its context because arrow functions inherit the context they're defined in and will never have a different value for `this` than the one they inherit.

```js
handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value,
  });
};
```

Also, this is a pattern that you can use for any controlled form as we're using a computed property for the key in state. As long as our inputs all have a `name` attribute that matches their key in state, this same `handleChange` event handler will work for all of our inputs and select tags.

In our `handleSubmit`, we'll be making a `POST` request to `/groups` to allow creating groups. We'll add the headers for json format and then promise callbacks to handle parsing the response as json format. Finally, after we get a response back from the server, we'd like to trigger a client side redirect so we can view the list of groups again.

```js
handleSubmit = (e) => {
  e.preventDefault();
  fetch("http://localhost:3001/groups", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ group: this.state }),
  })
    .then((res) => res.json())
    .then((groupJson) => {
      this.props.history.push("/");
    });
};
```

In order to trigger a client side redirect, we need to access the browser's history object and push in a new url. This will add this url to the browser history (so it will show up in the collection of urls accessible via the browser's forward adn back buttons). However, if we do this at the moment, we'll get an error that looks something like this:

![Cannot read property 'push' of undefined](https://res.cloudinary.com/dnocv6uwb/image/upload/v1614238143/Screen_Shot_2021-02-24_at_11.23.54_PM_rkk8bl.png)

The error will point us to the line `this.props.history.push('/')`. The issue is that the history prop isn't being added to the component. This history prop is one defined by react router and passed to our components that are hooked up as routes. The issue here, though, is how we defined the route in `App.js`. If we want the router props to be passed to the component, we can't just make the component a child of the route like so:

```js
<Route path="/groups/new">
  <GroupFormContainer />
</Route>
```

There are a couple of ways we can make sure that we have access to react router props within the `GroupFormContainer`. One is to use the component attribute for the [`<Route>`](https://reactrouter.com/web/api/Route).

```js
<Route path="/groups/new" component={GroupFormContainer} />
```

If we set up the route this way, React Router will pass in the 3 router props: `history`, `match` and `location` automatically. Once those props are available, the redirect should work and when we submit the form the client side router will switch back to `/` and we'll see the `GroupsIndexContainer` which will now include the group we just added.

# Part 3

## Adding Events and React Icons (maybe)

For this section, we'll be adding Events to our application.
These are the tasks we're going to need to accomplish:

## Add a New Container called `NewEventContainer` with a form that will create a new event.

```bash
touch src/containers/NewEventContainer.js
```

```js
import React, { Component } from "react";

export default class NewEventContainer extends Component {
  render() {
    return <form></form>;
  }
}
```

Our form needs to have inputs matching our database schema.

```rb
create_table "events", force: :cascade do |t|
  t.string "name"
  t.datetime "start_time"
  t.datetime "end_time"
  t.string "location"
  t.bigint "group_id", null: false
  t.bigint "users_id", null: false
  t.datetime "created_at", precision: 6, null: false
  t.datetime "updated_at", precision: 6, null: false
  t.index ["group_id"], name: "index_events_on_group_id"
  t.index ["users_id"], name: "index_events_on_users_id"
end
```

We'll need inputs for name, start_time, end_time, location and we'll also need to be able to accept a `poster` file input as well. We're set up on the backend to support this because we have `has_one_attached :poster` in our Event model.

```rb
class Event < ApplicationRecord
  has_one_attached :poster
  #...
end
```

So, it would be useful to have a description for events as well. So let's add that before we proceed. In the terminal with your raisl API in focus, we'll want to run :

```bash
rails g migration addDescriptionToEvents description:text
```

Check it to make sure it looks all right and then run it. You should see something like this, after you run `rails db:migrate`

```text
== 20210225231454 AddDescriptionToEvents: migrating ===========================
-- add_column(:events, :description, :text)
   -> 0.0442s
== 20210225231454 AddDescriptionToEvents: migrated (0.0443s) ==================
```

Now if we check schema we should see

```rb
create_table "events", force: :cascade do |t|
  t.string "name"
  t.datetime "start_time"
  t.datetime "end_time"
  t.string "location"
  t.bigint "group_id", null: false
  t.bigint "users_id", null: false
  t.datetime "created_at", precision: 6, null: false
  t.datetime "updated_at", precision: 6, null: false
  t.text "description"
  t.index ["group_id"], name: "index_events_on_group_id"
  t.index ["users_id"], name: "index_events_on_users_id"
end
```

So, our set of fields for the form will be:

- name (text input)
- description (textarea)
- start_time (datetime-local)
- end_time (datetime-local)
- location (text input)
- poster (file input)

Before we build out the form let's create a client side route so we can watch our progress in the browser.

## Add a client side route to display this component `/groups/:groupId/events/new`

To add the route, we'll hop over to `App.js` and import the new component we created.

```js
import NewEventContainer from "./containers/NewEventContainer";
```

```js
<Switch>
  <Route exact path="/">
    <GroupsIndexContainer />
  </Route>
  <Route path="/groups/new" component={GroupFormContainer} />
  <Route path="/groups/:groupId/events/new" component={NewEventContainer} />
</Switch>
```

So, to test this we'll visit `http://localhost:3000/groups/1/events/new` in our browser and we should see the form there. Now we can move on to actually building out our inputs.

## Build out our form inputs in the render() method

- name (text input)
- description (textarea)
- start_time (datetime-local)
- end_time (datetime-local)
- location (text input)
- poster (file input)

```js
import React, { Component } from "react";

export default class NewEventContainer extends Component {
  render() {
    return (
      <form className="max-w-4xl w-11/12 mx-auto mt-16 shadow-lg px-8 py-6">
        <h1 className="text-3xl text-center font-semibold mb-8">New Event</h1>
        <fieldset className="">
          <label for="name" className="block uppercase">
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
          <label for="description" className="block uppercase">
            Description
          </label>
          <textarea
            className="w-full border-2 p-4 my-4"
            name="description"
            id="description"
          ></textarea>
        </fieldset>
        <fieldset className="">
          <label for="start_time" className="block uppercase">
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
          <label for="end_time" className="block uppercase">
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
          <label className="block uppercase">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            className="w-full border-2 p-4 my-4"
          />
        </fieldset>
        <fieldset className="">
          <label className="block uppercase">Poster</label>
          <input type="file" className="w-full my-4" />
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
```

## Add a `handleSubmit` function that will create formData and post it to the API

We now need to add a handleSubmit to hit our API with the formData. Instead of using a controlled form here, we're going to pull the data out of the target of our submit event and attach it to a formData object we're building so we can send that as the body of our post request to create the new event. We ened to be thinking about what the rails API expects to see for the `event_params`

```rb
def event_params
  params.require(:event).permit(:name, :start_time, :end_time, :location, :poster)
end
```

So our formdata needs to include an event key and all other data should be nested underneath it. This means that when we append, all of the keys should start with `event[`

```js
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

  fetch("http://localhost:3001/events", {
    method: "post",
    body,
  })
    .then((res) => res.json())
    .then((eventJson) => {
      console.log(eventJson);
    });
};
```

If we fill in the form and submit it we get an error saying

```
{user: Array(1), group: Array(1)}
group: ["must exist"]
user: ["must exist"]
__proto__: Object
```

So we need to pass that information along. We also can check the rails server logs and we'll see something like this:

```
Started POST "/events" for ::1 at 2021-02-25 16:08:01 -0800
Processing by EventsController#create as */*
  Parameters: {"event"=>{"name"=>"Robots", "description"=>"yes", "start_time"=>"2021-02-25T16:07", "end_time"=>"2021-02-25T18:07", "location"=>"My Room", "poster"=>#<ActionDispatch::Http::UploadedFile:0x00007fd5e0cacf20 @tempfile=#<Tempfile:/var/folders/cs/6b2xd6z12dx3g0slv99vm92m0000gn/T/RackMultipart20210225-76245-1awfdqt.jpg>, @original_filename="robot-fi-m-festival-poster-template-fcbda66ecd661bce14afe3289ed4d35c_screen.jpg", @content_type="image/jpeg", @headers="Content-Disposition: form-data; name=\"event[poster]\"; filename=\"C:\\fakepath\\robot-fi-m-festival-poster-template-fcbda66ecd661bce14afe3289ed4d35c_screen.jpg\"\r\nContent-Type: image/jpeg\r\n">}}
Unpermitted parameter: :description
Completed 422 Unprocessable Entity in 2123ms (Views: 28.3ms | ActiveRecord: 114.4ms | Allocations: 60749)
```

So we need to check our strong parameters and add `:description` and `:group_id` to `event_params`, but the `:user_id` we can assign via a mocked `current_user` method in our application_controller. We'll build out auth later and then we can remove this method but for now let's add this:

```rb
class ApplicationController < ActionController::API
  def current_user
    User.first_or_create(email: 'test@test.com', password: 'password')
  end
end
```

Now, we can use this method in `EventsController#create` to add that foreign key automatically

```rb
# POST /events
def create
  @event = current_user.events.build(event_params)

  if @event.save
    render json: @event, status: :created, location: @event
  else
    render json: @event.errors, status: :unprocessable_entity
  end
end
# ...
def event_params
  params.require(:event).permit(:name, :description, :start_time, :end_time, :location, :group_id, :poster)
end

```

We need to be able to pass the group_id into the controller through params from our react form component, so we'll need to add that as well to our formData object. To figure out how we're going to do that, it would be nice to use some dev tools designed to show us what we have access to within the NewEventContainer component. So we want to check our React developer tools and look at the component to see what we can do.

Once we see the shape, we can pull out the data from the `match` prop added by react router (because this component is hooked up to a client side route). We'll add the following line before we send the body through our `fetch` request in `handleSubmit`

```js
body.append("event[group_id]", this.props.match.params.groupId);
```

Let's give it a shot!

We got a server error :(

```text
Completed 500 Internal Server Error in 750ms (ActiveRecord: 98.1ms | Allocations: 29170)



ActiveModel::UnknownAttributeError (unknown attribute 'user_id' for Event.):

app/controllers/events_controller.rb:18:in `create'
```

Checking the schema ti actually looks like this

```rb
create_table "events", force: :cascade do |t|
  t.string "name"
  t.datetime "start_time"
  t.datetime "end_time"
  t.string "location"
  t.bigint "group_id", null: false
  t.bigint "users_id", null: false
  t.datetime "created_at", precision: 6, null: false
  t.datetime "updated_at", precision: 6, null: false
  t.text "description"
  t.index ["group_id"], name: "index_events_on_group_id"
  t.index ["users_id"], name: "index_events_on_users_id"
end
```

We need to fix the refereces here.

```bash
rails g migration fixUserReferencesInEvents
```

```
class FixUserReferencesInEvents < ActiveRecord::Migration[6.1]
  def change
    rename_column :events, :users_id, :user_id
  end
end
```

```
create_table "events", force: :cascade do |t|
  t.string "name"
  t.datetime "start_time"
  t.datetime "end_time"
  t.string "location"
  t.bigint "group_id", null: false
  t.bigint "user_id", null: false
  t.datetime "created_at", precision: 6, null: false
  t.datetime "updated_at", precision: 6, null: false
  t.text "description"
  t.index ["group_id"], name: "index_events_on_group_id"
  t.index ["user_id"], name: "index_events_on_user_id"
end
```

Now, let's try that again!
Didn't work, maybe restart the server?
Woohoo!

```
{id: 1, name: "Robots", start_time: "2021-02-25T16:25:00.000Z", end_time: "2021-02-25T18:25:00.000Z", location: "My Room", …}created_at: "2021-02-26T00:32:12.255Z"description: "yes"end_time: "2021-02-25T18:25:00.000Z"group_id: 1id: 1location: "My Room"name: "Robots"start_time: "2021-02-25T16:25:00.000Z"updated_at: "2021-02-26T00:32:12.368Z"user_id: 1__proto__: Object
```

Now we can check Postico to see if the blob is there too.

## check in Postico that we've got the image upload working correctly.

Got it!!!

## Add a New Container component `GroupShowContainer`.

```bash
touch src/containers/GroupShowContainer.js
```

```js
import React, { Component } from "react";

export default class GroupShowContainer extends Component {
  render() {
    return <section>GroupShowContainer</section>;
  }
}
```

## Add a new client side route `/groups/:id` which points to the `GroupShowContainer`

in App.js

```js
import GroupShowContainer from "./containers/GroupShowContainer";
```

Then add the route to the switch statement

```js
<Switch>
  <Route exact path="/">
    <GroupsIndexContainer />
  </Route>
  <Route path="/groups/new" component={GroupFormContainer} />
  <Route path="/groups/:groupId/events/new" component={NewEventContainer} />
  <Route path="/groups/:groupId" component={NewEventContainer} />
</Switch>
```

## ADd links for to GroupsShowContainer's route from GroupListItem

```js
import React from "react";
import { Link } from "react-router-dom";

const GroupListItem = ({ group }) => {
  return (
    <li className="" key={group.id}>
      <Link to={`/groups/${group.id}`}>{group.name}</Link>
    </li>
  );
};

export default GroupListItem;
```

Check it out in the browser and see if we can get to our new component via the groups index. If you see GroupShowContainer in the browser after clicking on one of the links in the list, we're good to go!

## Add a `componentDidMount` to `GroupShowContainer` which will fetch from `/groups/:id` and get the group and its events. To start, we'll console.log the API response.

To get data for a particular group to display on our new Show page, we need to add a componentDidMount lifecycle method to trigger a fetch to get that information.

```js
componentDidMount() {
  const groupId = this.props.match.params.groupId
  fetch(`http://localhost:3001/groups/${groupId}`)
    .then(res => res.json())
    .then(groupJson => {
      console.log(groupJson);
    })
}
```

We'll see something like this:

```text
{id: 1, name: "software-engineering-052620", created_at: "2021-02-24T00:36:06.684Z", updated_at: "2021-02-24T00:36:06.684Z"}
```

We need to see the events for that group as well, so for that we need to introduce a serializer.

## Add a `GroupSerializer` to our Rails API that will include the events in the json response.

In our rails terminal, let's run

```bash
rails g serializer Group id name
```

Then we'll open the file and add `has_many :events`

```rb
class GroupSerializer
  include JSONAPI::Serializer
  attributes :id, :name
  has_many :events
end
```

To check that this is working we need to visit `http://localhost:3001/groups/1`. If we do that now we'll see no change, because we haven't actually used the serializer yet. We need to create a new instance in the show action in our GroupsController

```rb
# GET /groups/1
def show
  render json: GroupSerializer.new(@group, include: [:events])
end
```

Now let's revisit the route in the browser. Now we see this:

```text
NameError in GroupsController#show
GroupSerializer cannot resolve a serializer class for 'event'. Attempted to find 'EventSerializer'. Consider specifying the serializer directly through options[:serializer].
```

So, we need an EventSerializer as well.

```bash
rails g serializer Event id name description start_time end_time location poster
```

This will give us:

```rb
class EventSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :description, :start_time, :end_time, :location, :poster
end

```

Now, let's try the endpoint again. Now we see this:

```json
{
  "data": {
    "id": "1",
    "type": "group",
    "attributes": {
      "id": 1,
      "name": "software-engineering-052620"
    },
    "relationships": {
      "events": {
        "data": [
          {
            "id": "1",
            "type": "event"
          }
        ]
      }
    }
  },
  "included": [
    {
      "id": "1",
      "type": "event",
      "attributes": {
        "id": 1,
        "name": "Robots",
        "description": "yes",
        "start_time": "2021-02-25T16:25:00.000Z",
        "end_time": "2021-02-25T18:25:00.000Z",
        "location": "My Room",
        "poster": {
          "name": "poster",
          "record": {
            "id": 1,
            "name": "Robots",
            "start_time": "2021-02-25T16:25:00.000Z",
            "end_time": "2021-02-25T18:25:00.000Z",
            "location": "My Room",
            "group_id": 1,
            "user_id": 1,
            "created_at": "2021-02-26T00:32:12.255Z",
            "updated_at": "2021-02-26T00:32:12.368Z",
            "description": "yes"
          }
        }
      }
    }
  ]
}
```

WE got a lot of stuff, and more than we want and a little less than we need (a poster_url is missing).

We can make adjustments in our controller to return only the information we want. In our case, we can start by focusing on the poster_url and only returning that as opposed to all of the additional information we're currently getting that isn't necessary.

We want to add a method to the Event model to allow us to fetch the poster_url

```rb
def poster_url
  Rails.application.routes.url_helpers.url_for(poster) if poster.attached?
end
```

We can then adjust the serializer to use that as an attribute instead of poster

```rb
class EventSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :description, :start_time, :end_time, :location, :poster_url
end

```

WE get an error message

```text
ArgumentError in GroupsController#show
Missing host to link to! Please provide the :host parameter, set default_url_options[:host], or set :only_path to true
```

To fix this, we need to add some code to the bottom of config/environments/development.rb

```rb
Rails.application.routes.default_url_options = {
  host: 'http://localhost:3001'
}
```

Next, since we changed a file in the config directory, let's kill our rails server and restart it.

Now, we've got this:

```json
{
  "data": {
    "id": "1",
    "type": "group",
    "attributes": {
      "id": 1,
      "name": "software-engineering-052620"
    },
    "relationships": {
      "events": {
        "data": [
          {
            "id": "1",
            "type": "event"
          }
        ]
      }
    }
  },
  "included": [
    {
      "id": "1",
      "type": "event",
      "attributes": {
        "id": 1,
        "name": "Robots",
        "description": "yes",
        "start_time": "2021-02-25T16:25:00.000Z",
        "end_time": "2021-02-25T18:25:00.000Z",
        "location": "My Room",
        "poster_url": "http://localhost:3001/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7f41832ac530f42fe3f49057de8fdda3744ca3e6/robot-fi-m-festival-poster-template-fcbda66ecd661bce14afe3289ed4d35c_screen.jpg"
      }
    }
  ]
}
```

This is better, but it's going to require a bunch of destructuring client side to get at the data that we actually want. So we can go a bit further in the controller to streamline what it is we actually want.

In the GroupsController, we can use the `serializable_hash` method from the jsonapi serializer gem to pull out only the info we want. We want to have the group name and id and then an array of all of the events.

If we do this

```rb
hash = GroupSerializer.new(@group, include: [:events]).serializable_hash
hash[:data][:attributes] # will give us the id and name of the group
hash[:included] #looks like the following
[{:id=>"1", :type=>:event, :attributes=>{:id=>1, :name=>"Robots", :description=>"yes", :start_time=>Thu, 25 Feb 2021 16:25:00.000000000 UTC +00:00, :end_time=>Thu, 25 Feb 2021 18:25:00.000000000 UTC +00:00, :location=>"My Room", :poster_url=>"http://localhost:3001/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6Ik1RPT0iLCJleHAiOm51bGwsInB1ciI6ImFjdGl2ZV9zdG9yYWdlL2Jsb2IifX0=--ecbc1ed90ea21daec6b9fb54800eec6b5e8e6cb21418935b32f58fb8752299de/robot-fi-m-festival-poster-template-fcbda66ecd661bce14afe3289ed4d35c_screen.jpg"}}]
```

If we want to return something that looks like this:

```
{
  :group=> {
    :id=>1,
    :name=>"software-engineering-052620"
  },
  :events=>[
    {:id=>1, :name=>"Robots", :description=>"yes", :start_time=>Thu, 25 Feb 2021 16:25:00.000000000 UTC +00:00, :end_time=>Thu, 25 Feb 2021 18:25:00.000000000 UTC +00:00, :location=>"My Room", :poster_url=>"http://localhost:3001/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6Ik1RPT0iLCJleHAiOm51bGwsInB1ciI6ImFjdGl2ZV9zdG9yYWdlL2Jsb2IifX0=--ecbc1ed90ea21daec6b9fb54800eec6b5e8e6cb21418935b32f58fb8752299de/robot-fi-m-festival-poster-template-fcbda66ecd661bce14afe3289ed4d35c_screen.jpg"}
  ]
}
```

Then, we'd need to map over the `hash[:included]` and pull out the attributes for each.

```rb
hash[:included].map{|event| event[:attributes]}
```

Finally, we'd have something like this:

```rb
# GET /groups/1
def show
  hash = GroupSerializer.new(@group, include: [:events]).serializable_hash
  render json: {
    group: hash[:data][:attributes],
    events: hash[:included].map{|event| event[:attributes]}
  }
end

```

Now, we've got this:

```json
{
  "group": {
    "id": 1,
    "name": "software-engineering-052620"
  },
  "events": [
    {
      "id": 1,
      "name": "Robots",
      "description": "yes",
      "start_time": "2021-02-25T16:25:00.000Z",
      "end_time": "2021-02-25T18:25:00.000Z",
      "location": "My Room",
      "poster_url": "http://localhost:3001/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7f41832ac530f42fe3f49057de8fdda3744ca3e6/robot-fi-m-festival-poster-template-fcbda66ecd661bce14afe3289ed4d35c_screen.jpg"
    }
  ]
}
```

## We'll then get into displaying the events in a Grid using a new component called `EventsList`

Let's update our `GroupShowContainer` component to have state that updates after componentDidMount fires to display the group and its events.

```js
import React, { Component } from 'react'

export default class GroupShowContainer extends Component {
  state = {
    group: {},
    events: [],
    loading: true
  }

  componentDidMount() {
    const groupId = this.props.match.params.groupId
    fetch(`http://localhost:3001/groups/${groupId}`)
      .then(res => res.json())
      .then(groupJson => {
        console.log(groupJson);
      })
  }

  render() {
    return (
      <section>GroupShowContainer</section>
    )
  }
}
```

Let's add the centering logic to render and also a conditional statement that will render a spinner if loading is true and the content if not.

```js
import React, { Component } from 'react'

export default class GroupShowContainer extends Component {
  state = {
    group: {},
    events: [],
    loading: true
  }

  componentDidMount() {
    const groupId = this.props.match.params.groupId
    fetch(`http://localhost:3001/groups/${groupId}`)
      .then(res => res.json())
      .then(({group, events}) => {
        this.setState({
          group,
          events,
          loading: false
        })
      })
  }

  render() {
    if (this.state.loading) {
      return <div>Loading Spinner</div>;
    }
    return (
      <section>GroupShowContainer</section>
    )
  }
}
```

We won't render the component contents until we have the data from the API, so we don't need to add conditional logic to our second return statement's JSX.

Now, let's display the data and make it a tiny bit prettier.

```js
import React, { Component } from 'react'

export default class GroupShowContainer extends Component {
  state = {
    group: {},
    events: [],
    loading: true
  }

  componentDidMount() {
    const groupId = this.props.match.params.groupId
    fetch(`http://localhost:3001/groups/${groupId}`)
      .then(res => res.json())
      .then(({group, events}) => {
        this.setState({
          group,
          events,
          loading: false
        })
      })
  }

  render() {
    if (this.state.loading) {
      return <div>Loading Spinner</div>;
    }
    return (
      <section className="max-w-6xl w-11/12 mx-auto mt-16">
        <h1 className="text-3xl font-bold text-center">
          {this.state.group.name}
        </h1>
        <div className="grid grid-cols-3">
          {this.state.events.map((event) => (
            <figure>
              <img
                className=""
                alt={event.name}
                src={event.poster_url}
              />
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
```

## Connecting the two components

Our final task could be to add a link from the GroupShowContainer to the route where we can add an event to the group. And then, when we submit the form to add a new group, add a redirect back to this /groups/:id route.

```js
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
```

Add a link to the new event route from the /groups/:id route:


- Add Links to the `GroupsIndexContainer` to the corresponding route that will load the `GroupShowContainer` for the appropriate group.

## Resources

- [PosterMyWall](https://www.postermywall.com/index.php/posters/search?s=technical%20event&tt=image#)
