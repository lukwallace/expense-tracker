import React from 'react';
import moment from 'moment';

const Expense = ({ expense }) => {
  let { owner, datetime, amount, description } = expense;
  datetime = moment(datetime, 'x').format('MMMM Do YYYY, hh:mm a');
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