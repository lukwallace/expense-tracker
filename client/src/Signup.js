import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import { post } from './Requests';
import { storeToken } from './utils';
import './Onboarding.css';

class Signup extends Component {
  state = {
    username: '',
    password: ''
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
    const admin = document.activeElement.textContent === 'Spaces';
    post('/api/signup', Object.assign(this.state, { admin }))
    .then((res) => {
      if(res.token) {
        storeToken(res.token);
        this.props.router.push('/');
      }
    });
  }

  render() {
    return (
      <div className="Signup">
        <h1>Sign up</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange('username')} value={this.state.username}/>
          <input type="password" onChange={this.handleChange('password')} value={this.state.password}/>
          <button>Tabs</button> or <button>Spaces</button>
        </form>
        <Link to="/login"><p>Log in</p></Link>
      </div>
    );
  }
}

export default withRouter(Signup, { withRef: true });