import React, { Component } from 'react'

export default class LoginForm extends Component {
  constructor(props) {
    super(props) 
  }
  
  render() {
    return (
      <form className="logInForm" onSubmit={this.props.authenticate}>
        <h2>Log in to share questions with other users.</h2>
        <input 
          type="text" 
          name="email" 
          className="log-in-email"
          onChange={this.props.handleInputChange}
        />
        <input
         type="password"
         name="password"
         className="log-in-password"
         onChange={this.props.handleInputChange}
        />
        <button type="submit" className="log-in-btn">Log in</button>
    </form>
    )
  }
}

