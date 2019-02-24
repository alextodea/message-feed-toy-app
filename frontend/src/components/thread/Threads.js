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
                        .map(obj => {
                            const key = Date.now() + obj.createdDate;
                            return <Thread key={key} details={obj} />
                        })
                }
            </div>
        )
    }
}