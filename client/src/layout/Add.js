import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
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
        const data = new FormData();
        data.append('image',e.target.files[0])  // appand image binary
        this.setState({ image: data})
        console.log(data);
    }
    // send data via api to db
    handleSubmit = e => {


        e.preventDefault();  // prevend defult behaviour (reload page)
        //const imgdata = new FormData();  // define ne form data
        //imgdata.append('image', this.state.image)  // appand image binary
       // imgdata.append('name', this.state.image.name) // appand image name
        const that = this.state
        const cookies = new Cookies();
        const userId = cookies.get('userID',{ path: '/' });
        const token = cookies.get('token',{ path: '/' });
        const data = { // define data
            "title": that.title,  // define title conatined from state
            "description": that.description, // define title conatined from state
            "imageUrl": that.image ,  // define title image url from state
            "userId" : userId // user from cookies
        };
        const config = {  // define axios config
            method: 'post',   // method (POST - GET - PUT -PATCH - DELETE)
            url: `${BASE_URL}/posts`,  // api url
            headers: { 
                'Accept': 'application/json', 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'},
            data: data  // data as json object
        };
        axios(config) // excute axios api
        // promises 
            .then(res =>{  // respond after excute axios
            console.log(res);
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
