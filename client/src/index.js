import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import About from './components/about/About';

ReactDOM.render(
    <>
    <Router>
    <Switch>
      {/* <Route path="/sign">
        <Sign/>
      </Route>
      <Route path="/send">
        <Send/>
</Route> */}
      <Route path="/about">
        <About/>
      </Route> 
      <Route path="/">
      <App />
      </Route>
    </Switch>
    </Router>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
