import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Signup from '../containers/Signup'
import Signin from '../containers/Signin'
import '../css/App.css';

const idAppStyle = {
    left: '0px',
    top: '0px',
    position: 'absolute',
    width: '100%'
}

const App = (props) => 
  <Router>
    <div id='App' style={idAppStyle}>
      <Header/>
      <Switch>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/signin' component={Signin}/>
      </Switch>
      <Footer/>
    </div>
  </Router>

export default App;
