import React, { Component } from 'react'

export default class EmailFormGroup extends Component {
  render() {
    return (
      <div className="input-group form-group">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fas fa-envelope-open"></i></span>
        </div>
        <input 
          type="text" 
          name="email"
          placeholder="email"
          className="log-in-email"
          onChange={this.props.handleInputChange}
          autoComplete="off"
        />	
      </div>
    )
  }
}
