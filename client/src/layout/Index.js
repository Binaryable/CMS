import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import Read from './Read'
import Add from './Add'
import './index.sass'
export default class Index extends Component {
    render() {
        return (
<div id="indexpage">
<div className="">
<div class="row">
  <div class="col-4 mydashboard">
    <div class="list-group" id="list-tab" role="tablist">
    <center>
    <br />
      <img className="mb-3 logo" src="https://avatars.githubusercontent.com/u/85824601?s=200&v=4" alt="" width="90" height="90" />
      <br />      <br />
      <h2 className="text-white">Binaryable CMS</h2>
      </center>
      <br />
      <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">
        <h5>
        Index
        </h5>
        <p>(Complete Crud Operation)</p>
        
        </a>
      <a class="list-group-item list-group-item-action" id="list-read-list" data-bs-toggle="list" href="#list-read" role="tab" aria-controls="list-read">
      <h5>
        Read
        </h5>
        <p>(Map , List and delete)</p>
        
      </a>
      <a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">
      <h5>
        Add
        </h5>
        <p>(Add posts & Image upload)</p>
      </a>
    
    <br/>
    <a onClick={()=>{
      const cookies = new Cookies();
      cookies.remove('token')
      window.location.reload()
    }} className="delt list-group-item list-group-item-action">
      <h5>Logout</h5>
      </a>
    </div>
  </div>
  <div class="col-8">
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
        <div>
            <br />
            <br />
            <h2>
              Welcome to Binaryable Basic CMS
            </h2>
            <p>This Project for education purpose</p>
            <code>
              <p>Current funcionality</p>
              <ul>
                <li> Single page application + web api services </li>
                <li> Full authentication & authorization (JWT Based)</li>
                <li> Full CRUD operations</li>
                <li> File upload </li>

              </ul>
            </code>
        </div>
      </div>
      <div class="tab-pane fade" id="list-read" role="tabpanel" aria-labelledby="list-read-list">
      <Read />
      </div>
      <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
        <Add />
      </div>
      <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">lol</div>
    </div>
  </div>
</div></div>
            </div>
        )
    }
}
