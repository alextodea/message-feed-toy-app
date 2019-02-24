import React, { Component } from 'react'

export default class PasswordFormGroup extends Component {
  render() {
    return (
      <div className="input-group form-group">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fas fa-key"></i></span>
        </div>
        <input
          type="password"
          name="password"
          onChange={this.props.handleInputChange}
          placeholder="Password"
          autoComplete="off"
        />
      </div>
    )
  }
}
