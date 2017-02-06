import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import './Onboarding.css';

class Signup extends Component {
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
    const admin = document.activeElement.textContent === 'Spaces';
    console.log('Make request with:', this.state.user, this.state.pass, admin)
  }

  render() {
    return (
      <div className="Signup">
        <h1>Sign up</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange('user')} value={this.state.username}/>
          <input type="password" onChange={this.handleChange('pass')} value={this.state.password}/>
          <button>Tabs</button> or <button>Spaces</button>
        </form>
        <Link to="/login"><p>Log in</p></Link>
      </div>
    );
  }
}

export default withRouter(Signup, { withRef: true });