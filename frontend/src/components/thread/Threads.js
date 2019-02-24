import React, { Component } from 'react'
import Thread from './Thread'

export default class Threads extends Component {
    constructor(props) {
      super(props)
      this.handleComment = this.handleComment.bind(this);
    }

    handleComment(comment) {
        console.log(this.props.threads)
        this.props.onCommentSubmit(comment);
    }
    
    render() {
        const threadsObj = this.props.threads;
        return (
            <div className="list-of-threads">
                {
                    Object
                        .values(threadsObj)
                        .map(obj => {
                            const key = Date.now() + obj.createdDate;
                            return <Thread handleComment={this.handleComment} key={key} details={obj} />
                        })
                }
            </div>
        )
    }
}