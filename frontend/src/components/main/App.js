import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import * as ROUTES from "../../constants/routes";

// components
import Navbar from "../layout/Navbar";

// pages
import Feed from "../../pages/Feed";
import Profile from "../../pages/Profile";
import LogIn from "../../pages/LogIn";
import Register from "../../pages/Register";

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <Route path={ROUTES.FEED} exact={true} component={Feed} />
          <Route path={ROUTES.PROFILE} exact={true} component={Profile} />
          <Route path={ROUTES.REGISTER} exact={true} component={Register} />
          <Route path={ROUTES.LOG_IN} exact={true} component={LogIn} />
        </div>
      </Router>
    );
  }
}

export default App;
