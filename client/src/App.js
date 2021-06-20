import Login from './auth/Login'
import Register from './auth/Register'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from './shared/Footer';
import Index from './layout/Index';
import Cookies from 'universal-cookie';
function App() {
  const cookies = new Cookies();
  const token = cookies.get('token',{ path: '/' });
  return (
    <div>
    <Router>
      <Switch>
        {token ? <Route exact path="/">
            <Index />
          </Route> :
           <Route exact path="/">
           <Login/>
         </Route>
         }
          <Route exact path="/register">
            <Register />
          </Route>
      </Switch>
    </Router>
    <Footer />

    </div>
  );
}

export default App;