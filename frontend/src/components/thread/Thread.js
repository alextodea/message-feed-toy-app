import React, { Component } from 'react'
import {formatDate} from "../../helpers/common";

export default class Thread extends Component {
  render() {
    
    const details = this.props.details;
    const {email,createdDate,title} = details;
    const formattedDate = formatDate(createdDate);

    return (
        <div className="row d-flex justify-content-center single-thread-wrapper">
            <div className="card text-center single-thread-card">
                <div className="card-body">
                    <h5 className="card-title">{email}</h5>
                    <p className="card-text">{title}</p>
                    <button className="btn btn-primary">View Answers</button>
                </div>
                <div className="card-footer text-muted">
                    Posted on: {formattedDate}
                </div>
            </div>
        </div>
    )
  }
}