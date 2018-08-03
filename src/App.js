import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RestaurantContainer from './components/RestaurantContainer';
import GeoMapDirection from "./components/GeoMapDirection";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component { 
  render() {
    return (
      <Router>
        <div className="App homepage app_bgimage">
           <h2>Google Maps Test</h2>
           <ul className="list">
              <li><Link to={'/'}>Home</Link></li>             
           </ul>
           <hr />
           
           <Switch>
              <Route exact path='/' component={RestaurantContainer} />
              <Route exact path='/Direction' component={GeoMapDirection} /> 
           </Switch>
        </div>
     </Router>      
    );
  }
}

export default App;
