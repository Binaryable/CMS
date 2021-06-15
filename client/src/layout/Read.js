import React, { useState, useEffect } from 'react'
import axios from 'axios'
const { BASE_URL } = require('../shared/api') 
export default function Read() {
  
    // use react hooks to coollect and handle data from api
    // init data in hook
    const [posts, setPosts] = useState([]) // init post as empty array    
    // handel request using axios into use effect function
    useEffect(() => {
        // use axios to make get request
        axios.get(`${BASE_URL}/posts`).then(res => {
            setPosts(res.data)  // replace post empty array by returned data from db
        })
        console.log(articles);
    }, []); // dependencies array control excuting of function depend on what in betwen (ex : function )
    return (
        <div>
            
        </div>
    )
}