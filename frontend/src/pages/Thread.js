import React, { Component } from 'react'
import axios from "axios";

const apiUrl = "http://localhost:4000/threads/";

class Thread extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            message:null,
            isLoading:false,
            error: {
              exists:null,
              message:null
            }
        };
    }

    async componentDidMount() {
      this.setState({isLoading:true})

      try {
        const response = await axios.get(apiUrl);
        const message = response.data.message;

        const stateObj = {
          isLoading: false,
          message
        }

        await this.setState(stateObj)

      } catch(e) {
        const errStateObj = {
          isLoading:false,
          error: {
            exists:true,
            message: "some kind of error"
          }
        };
        this.setState(errStateObj);
      }
    }

  render() {

    const {isLoading,message,error} = this.state;

    if (error.exists) return <p>{error.message}</p>
    if (isLoading) return <p>Loading...</p>

    return (
      <div>
        <p>{message}</p>
      </div>
    )
  }
}

export default Thread
