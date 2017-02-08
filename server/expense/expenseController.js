const Expense = require('./expenseModel.js')
const User = require('../user/userModel.js');

// Gets all of the expenses
// will send back all of them if the user is an admin
const expenses = (req, res, next) => {
  const username = req._username;
  const query = User.findOne({ username });
  query.exec()
  .then((userDoc) => {
    const params = userDoc.admin ? {} : { owner: username };
    return Expense.find(params).exec();
  })
  .then((expenseDocs) => {
    res.json({ owner: username, expenses: expenseDocs});
  })
  .catch(err => console.error(err));
};

// Creates and sends the newly created expense back
const createExpense = (req, res, next) => {
  const username = req._username;
  const { datetime, amount, description } = req.body;
  const newExpense = new Expense({ owner: username, datetime, amount, description });
  newExpense.save()
  .then((expenseDoc) => {
    res.json(expenseDoc);
  })
  .catch((err) => {
    console.error(err);
  });
};

// Updates an expense of a given id
const updateExpense = (req, res, next) => {};

// Deletes an expense of a given id
const deleteExpense = (req, res, next) => {};

module.exports = {
  expenses,
  createExpense,
  updateExpense,
  deleteExpense
};
