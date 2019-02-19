import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"

// components
import Navbar from "./components/layout/Navbar";

// pages
import Thread from "./pages/Thread";
import Profile from "./pages/Profile";

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <Route path="/" exact={true} component={Thread} />
          <Route path="/profile" exact={true} component={Profile} />
        </div>
      </Router>
    );
  }
}

export default App;
