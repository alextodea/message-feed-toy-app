import React, { Component } from 'react'

export default class GreetingMsg extends Component {
  render() {
    const userEmail = this.props.userEmail;
    return (
      <div className="row greeting-message">
        <h1>Welcome {userEmail}. Feel free to post a thread or reply to one.</h1>
      </div>
    )
  }
}
