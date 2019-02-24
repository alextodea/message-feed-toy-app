import React, { Component } from 'react'

export default class LogoutBtn extends Component {
  render() {
    return (
      <button type="button" onClick={this.props.logMeOut} className="btn btn-info">Log out</button>
    )
  }
}
