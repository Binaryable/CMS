import React, { Component } from 'react'
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
      <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">Index</a>
      <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">Read</a>
      <a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Add</a>
      <a class="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings">Delete</a>
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
        </div>
      </div>
      <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
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
