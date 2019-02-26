import React, { Component } from 'react'

export default class AddThreadForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onThreadSubmit(this.questionTitle.value);
        this.threadForm.reset();
    }

    render() {
        return (
            <div className="add-thread-form-row">   
                <form ref={input => {this.threadForm = input}} className="write-thread-form" onSubmit={this.handleSubmit}>
                    <input ref={(input) => this.questionTitle = input} />
                    <button className="btn btn-primary add-thread-btn" type="submit">Add question</button>
                </form>
            </div>
        )
    }
} 
