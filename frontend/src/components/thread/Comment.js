import React, { Component } from 'react';
import DeleteButton from "../shared/DeleteButton";
const {formatDate} = require("../../helpers/common");

export default class Comment extends Component {
  constructor(props) {
    super(props)
    this.onClickDeleteComment = this.onClickDeleteComment.bind(this);
  }

  onClickDeleteComment() {
    const id = this.props.details._id;
    this.props.processCommentDelete(id);
  }
  
  render() {
    const details = this.props.details;
    let {author,body,createdDate} = details;
    const formattedDate = formatDate(createdDate);

    let deleteCommentBtn;
    const currentUser = localStorage.getItem("email");
    if (author===currentUser) {
      author = "Me";
      deleteCommentBtn = <DeleteButton onDeleteButtonClick={this.onClickDeleteComment} />
    }

    return (
      <li className="list-group-item">
          <div className="comment-delete-btn">{deleteCommentBtn}</div>
          <div className="comment-details-wrapper">
            <span className="comment-createdAt">replied on {formattedDate}</span>
            <span className="comment-author">by {author}</span>
          </div>
          <span className="comment-body">{body}</span>
      </li>
    )
  }
}
