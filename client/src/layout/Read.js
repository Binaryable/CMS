import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const { BASE_URL } = require('../shared/api') 
const { IMG_URL } = require('../shared/api') 

export default function Read() {
    // use react hooks to coollect and handle data from api
    // init data in hook
    const [posts, setPosts] = useState([]) // init post as empty array 
    const [page,setPage] = useState(1) // page (pagination) - defult page (1)
    // next page 
    const changePageNext = (e) =>{
        e.preventDefault()
        if (posts){
            setPage(page+1)
        }else{
            alert("no more data")
        }
    }
    // prev page
    const changePagePrev = (e) =>{
        e.preventDefault()
        if (page > 1){
        setPage(page-1)
        }else{
        alert("you are in first page")
        }
    }
    // handel request using axios into use effect function
    useEffect(() => {
        // use axios to make get request
        axios.get(`${BASE_URL}/posts?page=${page}`).then(res => {
            setPosts(res.data.posts)
            console.log(res.data);
            
       })
    }, [page]); // dependencies array control excuting of function depend on what in betwen (ex : function )
   
   const items = posts.map((item,key)=>{
       return (<div class="list-group">
<div  class="card" >
  <div class="row">
    <div class="col-md-2">
      <img src={IMG_URL+item.imageUrl} height='135px' width="135px" alt="..." />
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <h6 class="card-title">{item.title}</h6>
        <p class="card-text">{item.description}</p>
      </div>
    </div>
  </div>
</div>
  <br />
</div>)
   })
   
    return (
        <div className="container-fluid">
        <br />
        {items}
        <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><Link class="page-link" onClick={changePagePrev}>Previous</Link></li>
    <li class="page-item"><Link class="page-link" onClick={changePageNext} >Next</Link></li>
  </ul>
</nav>
        </div>
        
    )
}