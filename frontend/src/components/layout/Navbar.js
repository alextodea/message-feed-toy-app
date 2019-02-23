import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from "../../helpers/routes";
import LogoutBtn from "../auth/LogoutBtn";

class Navbar extends Component {
  render() {
    const isLoggedIn = this.props.state.isLoggedIn;
    let logoutBtn;
    if (isLoggedIn) logoutBtn = <LogoutBtn logMeOut = {this.props.logUserOut} />
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link className="navbar-brand" to={ROUTES.FEED}>
          Feedio
        </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.FEED}>Feed</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.PROFILE}>Profile</Link>
          </li>
          {logoutBtn}
        </ul>
      </div>
    </nav>
    )
  }
}

export default Navbar;