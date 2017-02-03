import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import './index.css';

class Index extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App} />
      </Router>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
