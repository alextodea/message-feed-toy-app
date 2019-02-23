import React, { Component } from 'react'

export default class RegisterForm extends Component {
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
