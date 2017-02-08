const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const SALT_ROUNDS = 10;

// Use bluebird (faster than ES6 promise)
mongoose.Promise = Promise;

const Schema = mongoose.Schema;
const expenseSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  datetime: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
