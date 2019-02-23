import React, { Component } from 'react'
import axios from "axios";
import {POST_LOG_IN} from "../helpers/routes";
import {Redirect} from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";

export default class Authenticate extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      email: "",
      password: "",
      verificationPassword: ""
    }

    this.authenticate = this.authenticate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  async authenticate(e) {
    e.preventDefault();

    try {
      
      const postBody = {
        email: this.state.email,
        password: this.state.password
      }

      const postCredentials = await axios.post(POST_LOG_IN,postBody);
      const responseData = postCredentials.data;

      localStorage.setItem("email",responseData.email);
      localStorage.setItem("token",responseData.token);

      this.props.authenticateUser();

    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
