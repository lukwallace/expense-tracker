import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { getToken, logOut } from './utils';
import { post, getExpenses } from './Requests';
import AddExpense from './AddExpense';
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
    expenses: [],
    datetime: '',
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
    logOut();
    this.props.router.push('/login');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div>
          <AddExpense datetime={this.state.datetime} amount={this.state.amount} description={this.state.description}/>
          <ExpenseList expenses={this.state.expenses} />
          <ul>
            <li> 
              <div className="expense">
                <h2> Joe <span> Tuesday 2:30 PM </span> </h2>
                <div className="amount"> 20.25 </div>
                <span> Delicious stufff </span>
              </div>
            </li>
            <li> 
              <div className="expense">
                <h2> Joe <span> Tuesday 2:30 PM </span> </h2>
                <div className="amount"> 20.25 </div>
                <div className="description"> Delicious stuff </div>
              </div>
            </li>
          </ul>

        </div>
        <button className="logOut" onClick={this.handleLogOut}>Log out</button>
      </div>
    );
  }
}

export default withRouter(App, { withRef: true });
