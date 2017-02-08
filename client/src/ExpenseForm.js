import React from 'react';
import moment from 'moment';
import Datetime from 'react-datetime'

const ExpenseForm = ({ handleChange, datetime, amount, description, handleExpenseSubmit }) => {
  return (
    <form className="ExpenseForm" onSubmit={handleExpenseSubmit}>
      <div className="Content"> 
        <div>
          <input type="number" placeholder="Amount" onChange={handleChange('amount')} value={amount}/>      
          <textarea rows="12" placeholder="Your decadant description here" onChange={handleChange('description')} value={description}/>
        </div>
        <Datetime value={datetime} onChange={handleChange('datetime')}/>
      </div>
      <input type='submit' value='Add Expense'/>
    </form>
  );
};

export default ExpenseForm;