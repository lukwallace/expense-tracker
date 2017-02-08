import React, { Component } from 'react';
import { withRouter } from 'react-router';
import moment from 'moment';

import { getToken, removeToken } from './utils';
import { submitExpense, getExpenses } from './Requests';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import logo from './logo.svg';
import './App.css';


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
    // Early return for unit testing components
    // Avoids router actions auto failing tests
    if(this.props.test) {
      return;
    }
    const token = getToken();
    if(token) {
      this.setState({ token });
    } else {
      this.props.router.push('/login');
    }
  }

  componentDidMount () {
    getExpenses(this.state.token)
    .then((data) => {
      const { owner, expenses } = data;
      this.setState({ owner, expenses });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleLogOut = () => {
    removeToken();
    this.props.router.push('/login');
  }

  handleExpenseSubmit = (event) => {
    event.preventDefault();
    submitExpense(this.state)
    .then((newExpense) => {
      this.setState({ expenses: [newExpense, ...this.state.expenses] });
    });
  }

  handleDelete = () => {}
  handleUpdate = () => {}
  generateReport = () => {}

  // State change slightly different for datetime picker
  handleChange = (key) => (eventMoment) => {
    const newState = {};
    newState[key] = key === 'datetime' ? eventMoment : eventMoment.target.value;
    this.setState(newState);
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
        <ExpenseList 
          expenses={this.state.expenses}
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
          generateReport={this.generateReport}
        />
        <button className="logOut" onClick={this.handleLogOut}>Log out</button>
      </div>
    );
  }
}

export default withRouter(App, { withRef: true });
