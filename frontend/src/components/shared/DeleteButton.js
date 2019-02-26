import React, { Component } from 'react'

export default class DeleteButton extends Component {
  constructor(props) {
    super(props)
    this.buttonClicked = this.buttonClicked.bind(this);
  }

  buttonClicked() {
    this.props.onDeleteButtonClick();
  }
  
  render() {
    return (
      <i className="fa fa-times" onClick={this.buttonClicked} aria-hidden="true"></i>
    )
  }
}
