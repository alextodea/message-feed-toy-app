import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { REGISTER } from "../../../helpers/routes"

export default class LoginFormFooter extends Component {  
  render() {
    return (
      <div className="card-footer">
        <div className="d-flex justify-content-center links">
          <span>Don't have an account?</span>
          <Link className="btn btn-link auth-footer-btn" to={REGISTER}>Register</Link>
        </div>
      </div>
    )
  }
}
