import React, { Component } from 'react'

export default class GreetingMsg extends Component {
  render() {
    const message = this.props.greetingMessage;
    return (
      <div className="row greeting-message">
        <h2>{message}</h2>
      </div>
    )
  }
}
