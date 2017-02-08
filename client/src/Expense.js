import React from 'react';

const Expense = ({ expense }) => {
  const { owner, datetime, amount, description } = expense;
  return (
    <div className="Expense">
      <h2> {owner} <span> {datetime} </span> </h2>
      <div className="Content">
        <div className="Amount"> ${amount} </div>
        <div className="Description"> {description} </div>
      </div>
    </div>
  );
};

export default Expense;