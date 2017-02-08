import React, { Component } from 'react';
import { withRouter } from 'react-router';
import moment from 'moment';

import { getToken, removeToken } from './utils';
import { post, getExpenses } from './Requests';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import logo from './logo.svg';
import './App.css';

const dummy = {
  _id: 'ohiu123huhida',
  owner: 'Johnny',
  datetime: new Date(),
  amount: 20.25,
  description: 'An exquisitely expensive sandwich'
}

class App extends Component {
  state = {
    token: '',
    owner: '',
    expenses: [],
    datetime: moment(),
    amount: '',
    description: ''
  }

  componentWillMount () {
    const token = getToken();
    if(token) {
      this.setState({ token });
    } else {
      this.props.router.push('/login');
    }
  }

  componentDidMount () {
    getExpenses(this.state.token)
    .then((expenses) => {
      this.setState({ expenses });
    });
  }

  handleLogOut = () => {
    removeToken();
    this.props.router.push('/login');
  }

  handleExpenseSubmit = (event) => {
    event.preventDefault();
    // post('/api/expense')
  }

  handleChange = (key) => {
    return (eventMoment) => {
      const newState = {};
      newState[key] = key === 'datetime' ? eventMoment : eventMoment.target.value;
      this.setState(newState);
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1> Expense Tracker </h1>
        </div>
        <ExpenseForm 
          datetime={this.state.datetime}
          amount={this.state.amount}
          description={this.state.description}
          handleExpenseSubmit={this.handleExpenseSubmit}
          handleChange={this.handleChange}
        />
        <ExpenseList expenses={this.state.expenses} />
        <button className="logOut" onClick={this.handleLogOut}>Log out</button>
      </div>
    );
  }
}

export default withRouter(App, { withRef: true });
