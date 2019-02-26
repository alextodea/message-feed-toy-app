import React, { Component } from 'react'

export default class Comment extends Component {
  constructor(props) {
    super(props)
    this.onClickDeleteComment = this.onClickDeleteComment.bind(this);
  }

  onClickDeleteComment() {
    const id = this.props.details._id;
    console.log(id)
    this.props.processCommentDelete(id);
  }
  
  render() {
    const details = this.props.details;
    let {author,body,createdDate} = details;

    let deleteCommentBtn;
    const currentUser = localStorage.getItem("email");
    if (author===currentUser) {
      author = "Me:";
      deleteCommentBtn = <i className="fa fa-times" onClick={this.onClickDeleteComment} aria-hidden="true"></i>;
    }

    return (
      <li className="list-group-item">
          <span className="comment-author">{author}</span>
          <span className="comment-body">{body}</span>
          <span className="comment-createdAt">{createdDate}</span>
          {deleteCommentBtn}
      </li>
    )
  }
}
