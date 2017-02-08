import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import { post } from './Requests';
import { storeToken } from './utils';
import './Onboarding.css';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (key) => (event) => {
    const newState = {};
    newState[key] = event.target.value;
    this.setState(newState);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    post('/api/login', this.state)
    .then((res) => {
      if(res.token) {
        storeToken(res.token);
        this.props.router.push('/');
      }
    });
  }

  render() {
    return (
      <div className="Login">
        <h1>Log in</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange('username')} value={this.state.username}/>
          <input type="password" onChange={this.handleChange('password')} value={this.state.password}/>
          <input type='submit' value='Login'/>
        </form>
        <Link to="/signup"><p>Sign up</p></Link>
      </div>
    );
  }
}

export default withRouter(Login, { withRef: true });