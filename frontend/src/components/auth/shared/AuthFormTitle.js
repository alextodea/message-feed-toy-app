import React, { Component } from 'react'

export default class AuthFormTitle extends Component {
  render() {
    const title = this.props.title;
    return (
      <div className="card-header text-center">
        <h3>{title}</h3>
      </div>
    )
  }
}
