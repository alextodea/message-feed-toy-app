import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { LOG_IN } from "../../../helpers/routes"

export default class RegisterFormFooter extends Component {  
  render() {
    return (
      <div className="card-footer">
        <div className="d-flex justify-content-center links">
          <span>Already have an account?</span>
          <Link className="btn btn-link auth-footer-btn" to={LOG_IN}>Log in</Link>
        </div>
      </div>
    )
  }
}
