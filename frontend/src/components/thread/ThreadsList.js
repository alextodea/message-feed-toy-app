import React, { Component } from 'react';

// components
import Thread from "./Thread";

export default class ThreadsList extends Component {
  constructor(props) {
    super(props)
    this.liftToRemoveThread = this.liftToRemoveThread.bind(this);
    this.liftToRemoveComment = this.liftToRemoveComment.bind(this);
    this.liftToHandleComment = this.liftToHandleComment.bind(this);
  }

  liftToRemoveThread(_id) {
    this.props.removeThread(_id);
  }

  liftToRemoveComment(commentId,threadId) {
    this.props.removeComment(commentId,threadId);
  }

  liftToHandleComment(commentObj) {
    this.props.handleComment(commentObj);
  }
  
  render() {
    return (
      <div className="list-of-threads">
          {
              Object
                  .values(this.props.details)
                  .map(obj => {
                      const key = Date.now() + obj._id;
                      return <Thread 
                              liftToRemoveThread={this.liftToRemoveThread}
                              liftToRemoveComment={this.liftToRemoveComment} 
                              liftToHandleComment={this.liftToHandleComment} 
                              key={key} 
                              details={obj} 
                              />
                  })
          }
      </div>
    )
  }
}
