import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentWillMount () {
    this.props.router.push('/login');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div>
          Hello World!
        </div>
      </div>
    );
  }
}

export default withRouter(App, { withRef: true });
