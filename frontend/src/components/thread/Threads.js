import React, { Component } from 'react'
import Thread from './Thread'

export default class Threads extends Component {
  
    render() {
        const threadsObj = this.props.threads;
        return (
            <div className="list-of-threads">
                {
                    Object
                        .values(threadsObj)
                        .map(thread => {
                            const key = Object.keys(thread);
                            return <Thread key={key} details={thread[key]} />
                        })
                }
            </div>
        )
    }
}