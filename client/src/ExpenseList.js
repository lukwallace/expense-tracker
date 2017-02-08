import React from 'react';
import Expense from './Expense';

const ExpenseList = ({ expenses }) => {
  // Undefined edge case is created by tests 
  if(expenses === undefined || expenses.length === 0) {
    return (
      <h1 className="NoExpense"> Add an expense above! </h1>
    );
  }
  
  return (
    <ul>
      {expenses.map(expense => 
        <li key={expense._id}>
          <Expense expense={expense} />
        </li>
      )}
    </ul>
  );
};

export default ExpenseList;