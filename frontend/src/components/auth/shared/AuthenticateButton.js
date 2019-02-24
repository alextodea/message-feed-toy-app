import React, { Component } from 'react'

export default class AuthenticateButton extends Component {      
  render() {
    const btnText = this.props.authBtnText;
    return (
      <div className="form-group">
        <button type="submit" className="btn float-right btn btn-success">{btnText}</button>
      </div>
    )
  }
}
