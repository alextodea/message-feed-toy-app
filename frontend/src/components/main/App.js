import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import * as ROUTES from "../../helpers/routes";
import jwtDecode from "jwt-decode";
import axios from "axios";

// components
import Navbar from "../layout/Navbar";

// pages
import Feed from "../../pages/Feed";
import Profile from "../../pages/Profile";
import LogIn from "../../pages/LogIn";
// import NotFound from "../shared/NotFound";

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn:false
    }
    
    this.authenticateUser = this.authenticateUser.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
  }

  componentDidMount() {
    this.authenticateUser();
  }

  authenticateUser() {
    const token = localStorage.getItem("token");
    if (!token) return this.setState({isLoggedIn:false});
    const expiryDate = jwtDecode(token).exp;
    const dateNow = Date.now();
    if ( (dateNow/1000 > expiryDate) && this.state.isLoggedIn) return this.setState({isLoggedIn:false});
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return this.setState({isLoggedIn:true});
  };

  logUserOut() {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    return this.setState({isLoggedIn:false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    if (!isLoggedIn) return <LogIn {...this} />
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar {...this} />
          <Route path={ROUTES.FEED} exact={true} component={Feed} />
          <Route path={ROUTES.PROFILE} exact={true} component={Profile} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
