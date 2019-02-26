import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './pages/search/home';
import About from './pages/search/about';
import Contact from './pages/search/contact';

class App extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="header flex">
          <div></div>
          <ul className="navigation">
            <li>
              <NavLink
                exact
                to="/home"
                activeClassName="active">
                <span className="link-wrap">
                  <span className="link-text">Home</span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/about"
                activeClassName="active">
                <span className="link-wrap">
                  <span className="link-text">About</span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/contact"
                activeClassName="active">
                <span className="link-wrap">
                  <span className="link-text">Contact</span>
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/home/about" component={About} />
          <Route path="/home/contact" component={Contact} />
        </Switch>
      </div>
    );
  }
}

export default App;
