import Login from './auth/Login'
import Register from './auth/Register'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from './shared/Footer';
import Index from './layout/Index';
function App() {

  return (
    <div>
    <Router>
      <Switch>
          
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/Index">
            <Index />
          </Route>
          <Route exact path="/Register">
            <Register />
          </Route>
      </Switch>
    </Router>
    <Footer />

    </div>
  );
}

export default App;