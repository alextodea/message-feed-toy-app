import React, { Component } from 'react'

// components
import Comment from "./Comment";

export default class CommentsList extends Component {
  constructor(props) {
    super(props)
    this.processCommentDelete = this.processCommentDelete.bind(this);
  }

  processCommentDelete(commentId) {
    const threadId = this.props.details._id;
    this.props.liftUpCommentDeleteParams(commentId,threadId);
};
  
  render() {
    const details = this.props.details;
    return (
      <div className="card-comments-wrapper">
          <ul className="list-group list-group-flush">
              {
                  (details.comments && details.comments.length > 0) &&
                      details.comments.map(obj => {
                          const key = Date.now() + obj.createdDate;
                          return <Comment processCommentDelete={this.processCommentDelete} key={key} details={obj} />
                      })
              }
          </ul>
      </div>
    )
  }
}
