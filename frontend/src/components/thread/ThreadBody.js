import React, { Component } from 'react'
import {formatDate} from "../../helpers/common";

// components
import DeleteButton from "../shared/DeleteButton";

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
        <h5 className="card-title">wrote by {authorEmail}</h5>
        <p>on: {formattedDate}</p>
        <span className="card-text">{title}</span>
        {deleteThreadButton}
      </div>
    )
  }
}
