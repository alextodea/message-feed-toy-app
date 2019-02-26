import React, { Component } from 'react';
import axios from "axios";
import { Redirect} from "react-router-dom";

import * as ROUTES from "../../helpers/routes";
import AuthorFormTitle from "./shared/AuthFormTitle";
import EmailFormGroup from "./shared/EmailFormGroup";
import PasswordFormGroup from "./shared/PasswordFormGroup"
import VerificationPassFormGroup from "./shared/VerificationPassFormGroup"
import AuthenticateButton from "./shared/AuthenticateButton"
import RegisterFormFooter from "./shared/RegisterFormFooter";
import DisplayErrorMessageDiv from "./shared/DisplayErrorMessageDiv";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email:"",
      password:"",
      verificationPassword:"",
      token:"",
      formTitle: "Register",
      error: {
        exists:false,
        message:""
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]:value})
  };

  async handleRegisterSubmit(e) {
    e.preventDefault();

    try {
      const {email,password,verificationPassword} = this.state;
      const postBody = {email,password,verificationPassword};
      const postCredentials = await axios.post(ROUTES.POST_REGISTER,postBody);
      const responseData = postCredentials.data;

      localStorage.setItem("email",responseData.email);
      localStorage.setItem("token",responseData.token);

      this.props.authenticateUser();
    } catch(e) {
      const errorMsg = e.response.data.message;
      this.setState({
        error: {
          exists:true,
          message:errorMsg
        }
      })
    }
  }
  
  
  render() {
    if (this.props.state.isLoggedIn) return <Redirect to="/"/>

    let displayErrorMsg;
    if (this.state.error.exists) {
      displayErrorMsg = <DisplayErrorMessageDiv errorMessage={this.state.error.message} />
    }

    return (
      <div className="authentication-section">
        <div className="card">
        <AuthorFormTitle title={this.state.formTitle} />
        <div className="card-body">
          <form onSubmit={this.handleRegisterSubmit}>
            <EmailFormGroup handleInputChange={this.handleInputChange}/>
            <PasswordFormGroup handleInputChange={this.handleInputChange}/>
            <VerificationPassFormGroup handleInputChange={this.handleInputChange}/>
            <AuthenticateButton authBtnText={this.state.formTitle} />
          </form>
          {displayErrorMsg}            
        </div>
        <RegisterFormFooter/>
        </div>
      </div>
    )
  }
}