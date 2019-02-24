import React, { Component } from 'react'

export default class VerificationPassFormGroup extends Component {
  render() {
    return (
      <div className="input-group form-group">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fas fa-key"></i></span>
        </div>
        <input
          type="password"
          name="verificationPassword"
          onChange={this.props.handleInputChange}
          placeholder="Re-type password"
          autoComplete="off"
        />
      </div>
    )
  }
}
