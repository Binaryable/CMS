import React, { Component } from 'react'
import axios from 'axios'
const { BASE_URL } = require('../shared/api') 
export default class Add extends Component {
    render() {
        // init state (those data would be sent via api )
        state = {
            title: "", 
            content: "", 
            image_url: "", 
            SelectedFile: {}, 
        }
        // detect change in inputs and set it to state
        handleInput = e => {
            e.preventDefault();
            const name = e.target.name; // input name  <inpu name="" />
            const value = e.target.value; // input name  <inpu value="" />
            this.setState({ [name]: value }) // set state <input name="filed1" value ="data1" /> ---> 
        // -->  setstate filed1 :  data1
        }       
        // select image and add it to react state
        slectImage = e => {
            e.preventDefault();
            this.setState({ SelectedFile: e.target.file[0] })
        }
 
        // send image via api to data base
        imageHandler = () => {
            const data = new FormData();  // define ne form data
            data.append('image', this.state.SelectedFile)  // appand image binary
            data.append('name', this.state.SelectedFile.name) // appand image name
            axios.post(`${BASE_URL}`, data).then(
                res => {
                this.setState({image_url})
                }
            )
        }
        // send data via api to db
        handleSubmit = e => {
            e.preventDefault();  // prevend defult behaviour (reload page)
            const that = this.state
            const data = { // define data
                "title": that.title,  // define title conatined from state
                "content": that.content, // define title conatined from state
                "image_url": that.image_url // define title conatined from state
            };
            const config = {  // define axios config
                method: 'post',   // method (POST - GET - PUT -PATCH - DELETE)
                url: `${BASE_URL}/api/url`,  // api url
                data: JSON.stringify(data)  // data as json object
            };
            
            axios(config) // excute axios api



            // promises 
                .then(res =>{  // respond after excute axios
                console.log(res.data);
                })
                .catch(err => { // catch error if happend
                console.log(err);
                });
        }

        return (
            <div>

                
            </div>
        )
    }
}
