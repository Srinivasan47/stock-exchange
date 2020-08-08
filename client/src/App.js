import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import Routes from "./Routes";
import "./App.css";
import { createBrowserHistory } from "history";
const customHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={customHistory}>
        <Routes />
      </Router>
    );
  }
}
