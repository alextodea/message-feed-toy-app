import React, { Component } from 'react'
import axios from "axios";
import {POST_REGISTER} from "../helpers/routes";

export default class Register extends Component {
  constructor() {
    super()
  
    this.state = {
       email: "",
       password: "",
       verificationPassword: "",
       message: ""
    }

    this.authenticate = this.authenticate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async authenticate(e) {
    e.preventDefault();

    try {
      
      const postBody = {
        email: this.state.email,
        password: this.state.password,
        verificationPassword: this.state.verificationPassword
      }

      const postCredentials = await axios.post(POST_REGISTER,postBody);
      const responseData = postCredentials.data;

      localStorage.setItem("email",responseData.email);
      localStorage.setItem("token",responseData.token);

    } catch(e) {
      console.log(e);
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.state[name] = value;
  }
  
  render() {
    return (
      <form className="logInForm" onSubmit={this.authenticate}>
        <h2>Log in to share questions with other users.</h2>
        <h4>
          Type in e-mail.
        </h4>
        <input 
          type="text" 
          name="email" 
          className="form-email"
          onChange={this.handleInputChange}
        />
        <h4>
          Type in password.
        </h4>
        <input
         type="password"
         name="password"
         className="form-password"
         onChange={this.handleInputChange}
        />
        <h4>
          Re-type password.
        </h4>
        <input
         type="password"
         name="verificationPassword"
         className="form-password"
         onChange={this.handleInputChange}
        />
        <button type="submit" className="log-in-btn">Sign up</button>
    </form>
    )
  }
}