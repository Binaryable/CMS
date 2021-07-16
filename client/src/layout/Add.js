import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
const { BASE_URL } = require('../shared/api') 
export default class Add extends Component {  
     // init state (those data would be sent via api )
     state = {
        title: "", 
        description: "", 
        image: {}, 
    }
    // detect change in inputs and set it to state
    handleInputs = e => {
        e.preventDefault();
        const name = e.target.name; // input name  <inpu name="" />
        const value = e.target.value; // input name  <inpu value="" />
        this.setState({ [name]: value }) // set state <input name="filed1" value ="data1" /> ---> 
    // -->  setstate filed1 :  data1
    } 
    // select image and add it to react state
    slectImage = (e) => {
        e.preventDefault();
        this.setState({ image: e.target.files[0]})
        console.log(e.target.files);
    }
    // send data via api to db
    handleSubmit = e => {


        e.preventDefault();  // prevend defult behaviour (reload page)
        const cookies = new Cookies();
        const userId = cookies.get('userID',{ path: '/' });
        const token = cookies.get('token',{ path: '/' });

        const formdata = new FormData();
        formdata.append("title", this.state.title);
        formdata.append("description",this.state.description);
        formdata.append("imageUrl", this.state.image);
        formdata.append("creator", userId);
       
        const config = {  // define axios config
            method: 'post',   // method (POST - GET - PUT -PATCH - DELETE)
            url: `${BASE_URL}/posts`,  // api url
            headers: { 
                'Accept': 'application/json', 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'},
            data: formdata  // data as form-data to send
        };
        axios(config) // excute axios api
        // promises 
            .then(res =>{  // respond after excute axios
            console.log(res)
            const Swal = require('sweetalert2')
            Swal.fire({
                title: 'Post added !',
                text: `you post has been added with title ${this.state.title}`,
                icon: 'success',
                confirmButtonText: 'nice !'
              })

            })
            .catch(err => { // catch error if happend
            console.log(err);
            });
    }
    render() {
        return (
            <div className="container">
               <form onSubmit={this.handleSubmit}>
      <center>
      <br /> 
      <h1 className="h3 mb-3 fw-normal">Create Post</h1>
      </center>
      <div className="form-floating">
      <input name="title" onChange={this.handleInputs} type="text" className="form-control" id="floatingInput" />
      <label htmlFor="floatingInput">Title</label>
      <br />
    </div>
    <div className="form-floating">
      <input name="description" onChange={this.handleInputs} type="textarea" className="form-control" id="floatingInput"  />
      <label htmlFor="floatingInput">Description</label>
      <br />

    </div>
    <div className="form-floating">
      <input name="image" onChange={this.slectImage} type="file" class="form-control" id="exampleFormControlFile1" />
      <label htmlFor="floatingPassword">Image</label>
      <br />

    </div>
    <button className="w-100 btn btn-lg btn-primary" type="submit">Post !</button>
  </form>
            </div>
        )
    }
}
