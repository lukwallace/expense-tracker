const Expense = require('./expenseModel.js')
const User = require('../user/userModel.js');

module.exports = {
  expenses(req, res, next) {
    const username = req._username;
    const query = User.findOne({ username });
    query.exec()
    .then((userDoc) => {
      const params = userDoc.admin ? {} : { owner: username };
      return Expense.find(params).exec();
    })
    .then((expenseDocs) => {
      res.json(expenseDocs);
    })
    .catch(err => console.error(err));
  },

  create(req, res, next) {    
  },

  update() {},
  delete() {}
}