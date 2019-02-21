import React, { Component } from 'react'

export default class LogIn extends Component {
  constructor() {
    super()
  }
  
  render() {
    return (
      <form className="logInForm" onSubmit={()=>this.authenticate()}>
        <h2>Log in to share questions with other users.</h2>
        <input type="text" className="log-in-email" ref={input=>this.email = input}/>
        <input type="password" className="log-in-password" ref={input=>this.password = input}/>
        <button type="submit" className="log-in-btn">Log in</button>
    </form>
    )
  }
}
