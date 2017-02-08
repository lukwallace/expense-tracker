import React from 'react';
import Expense from './Expense';

const ExpenseList = ({ expenses }) => {
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