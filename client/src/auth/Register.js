import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import {Link} from 'react-router-dom'
import './auth.scss'
const { BASE_URL } = require('../shared/api')  
export default class Register extends Component {
  state = {}
  handleInputs =(e)=>{
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    const val = this.state
    const data = {
      email: val.email ,
      password : val.password,
      name : val.name
    }
  axios.post(`${BASE_URL}/users/signup`,data).then(res=>{
    console.log(res);
    alert("Your account has been created !")
  })
  }
    render() {
        return (
<div className="" id="login">
<br /><br /><br />
<main className="form-signin">
  <form onSubmit={this.handleSubmit}>
      <center>
      <img className="mb-6 logo" src="https://avatars.githubusercontent.com/u/85824601?s=200&v=4" alt="" width="90" height="90" />
      <br />      <br />

      <h1 className="h3 mb-3 fw-normal">Create new account</h1>
      </center>
      <div className="form-floating">
      <input name="name" onChange={this.handleInputs} type="text" className="form-control" id="floatingInput" placeholder="example" />
      <label htmlFor="floatingInput">Username</label>
    </div>
    <div className="form-floating">
      <input name="email" onChange={this.handleInputs} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
      <label htmlFor="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input name="password" onChange={this.handleInputs} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
      <label htmlFor="floatingPassword">Password</label>
    </div>
    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
  </form>
  <br /><br />
    <p>Already have registered account ? <Link to="/Login">Singin</Link> </p>
</main>
            </div>
        )
    }
}
