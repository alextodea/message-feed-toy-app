import React, { Component } from 'react'
import DeleteButton from "../shared/DeleteButton";

const {formatDate} = require("../../helpers/common");

export default class ThreadBody extends Component {
  constructor(props) {
    super(props)
    this.onClickDeleteThread = this.onClickDeleteThread.bind(this);
  
  }

  onClickDeleteThread() {
    const threadId = this.props.details._id;
    this.props.liftUpThreadDeleteParam(threadId);
  }
  
  render() {
        
        const details = this.props.details;
        let {authorEmail,createdDate,title} = details;
        const formattedDate = formatDate(createdDate);

        let deleteThreadButton;
        const thisUserEmail = localStorage.getItem("email");

        if (authorEmail === thisUserEmail) {
            authorEmail = "myself"
            deleteThreadButton = <DeleteButton onDeleteButtonClick={this.onClickDeleteThread} />
        };

    return (
      <div className="card-body">
        <div className="thread-delete-btn">{deleteThreadButton}</div>
        <div className="thread-date">Posted on: {formattedDate}</div>
        <div className="thread-author">by {authorEmail}</div>
        <div className="thread-title">{title}</div>
      </div>
    )
  }
}
