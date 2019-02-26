import React, { Component } from 'react'

export default class DisplayErrorMessageDiv extends Component {
  render() {
    return (
      <div className="auth-error-message">
          {this.props.errorMessage}
      </div>
    )
  }
}
