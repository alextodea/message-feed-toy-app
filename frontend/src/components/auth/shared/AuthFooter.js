import React, { Component } from 'react'

export default class AuthFooter extends Component {  
  render() {
    const footerSpanText = this.props.footerSpanText;
    const footerBtnText = this.props.footerBtnText;
    return (
      <div className="card-footer">
        <div className="d-flex justify-content-center links">
          <span>{footerSpanText}</span>
          <button className="btn btn-link auth-footer-btn" onClick={this.props.toggleAuthState}>{footerBtnText}</button>
        </div>
      </div>
    )
  }
}
