import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import './Onboarding.css';

class Login extends Component {
  state = {
    user: '',
    pass: ''
  }

  handleChange = (key) => {
    return (event) => {
      const newState = {};
      newState[key] = event.target.value;
      this.setState(newState);
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //TODO: Import a requests file
    console.log('Make request with:', this.state.user, this.state.pass)
    fetch('http://localhost:3001')
    .then(res => res.json())
    .then(res => console.log('Success!', res))
    .catch(err => console.log('[Error]:', err));
  }

  render() {
    return (
      <div className="Login">
        <h1>Log in</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange('user')} value={this.state.username}/>
          <input type="password" onChange={this.handleChange('pass')} value={this.state.password}/>
          <input type='submit' value='Login'/>
        </form>
        <Link to="/signup"><p>Sign up</p></Link>
      </div>
    );
  }
}

export default withRouter(Login, { withRef: true });