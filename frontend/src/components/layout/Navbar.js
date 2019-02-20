import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from "../../constants/routes";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link className="navbar-brand" to={ROUTES.FEED}>
          Feedio
        </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.FEED}>Feed<span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.PROFILE}>Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.LOG_IN}>Log in</Link>
          </li>
        </ul>
      </div>
    </nav>
    )
  }
}

export default Navbar;