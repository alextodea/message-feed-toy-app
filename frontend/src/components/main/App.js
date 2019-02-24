import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import * as ROUTES from "../../helpers/routes";
import jwtDecode from "jwt-decode";
import axios from "axios";

// components
import Navbar from "../layout/Navbar";

// pages
import Feed from "../../pages/Feed";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm"
import ProtectedRoute from "../../components/auth/ProtectedRoute";
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
    if (dateNow/1000 > expiryDate) return this.setState({isLoggedIn:false});
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return this.setState({isLoggedIn:true});
  };

  logUserOut() {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    return this.setState({isLoggedIn:false});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar {...this} />
          <ProtectedRoute path={ROUTES.FEED} exact={true} isLoggedIn={this.state.isLoggedIn} component={Feed} />
          <Route 
            path={ROUTES.LOG_IN} 
            exact={true}
            render={ () =>{ return(
              <LoginForm {...this} />
            )}}
          />
          <Route 
            path={ROUTES.REGISTER} 
            exact={true}
            render={ () =>{ return(
              <RegisterForm {...this} />
            )}}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
