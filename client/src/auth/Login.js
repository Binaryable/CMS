import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import { Redirect } from 'react-router';
import './auth.scss'
const { BASE_URL } = require('../shared/api')
export default class Login extends Component {
  state = {
  }
  handleInputs =(e)=>{
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    const data = {
      email: this.state.email ,
      password : this.state.password
    }
  const Swal = require('sweetalert2')
  axios.post(`${BASE_URL}/users/login`,data).then(res => {
    console.log(res.data);
    const token = res.data.token
    const userID = res.data.userId
    const cookies = new Cookies();
    cookies.set('token',token, { path: '/' })
    cookies.set('userID',userID, { path: '/' })
    Swal.fire({
      title: 'Loged in !',
      text: `welcome back ${res.data.email}`,
      icon: 'success',
      confirmButtonText: 'Cool'
    }).then(()=>{
      window.location.reload()
    })
  })
  }
    render() {
        return (
<div  id="loginpage">
  <br /><br /><br />
<main className="form-signin">
  <form onSubmit={this.handleSubmit}>
      <center>
      <img className="mb-6 logo" src="https://avatars.githubusercontent.com/u/85824601?s=200&v=4" alt="" width="90" height="90" />
      <br />      <br />

      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
      </center>

    <div className="form-floating">
      <input name="email" onChange={this.handleInputs} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
      <label htmlFor="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input name="password" onChange={this.handleInputs} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
      <label htmlFor="floatingPassword">Password</label>
    </div>
    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
  <br /><br />
    <p>Don't have account ? <Link to="/register">Create account now</Link> </p>
</main>
 </div>
        )
    }
}
