import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import SlugBook from "./SlugBook";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <div className = 'home-text'>
              <p>Welcome this is a full statck website made with React.js ,Django and Rest-Api </p>
              <p>You can post reviews and see there sentiment with the help of ml model deployed in the backend</p>
              <p >Please login and move to <a  href="/join">Flights</a> tab to see Reviews</p>
              </div>
          </Route>
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/slug/:slug" component = {SlugBook}/>
        </Switch>
      </Router>
    );
  }
}