const Expense = require('./expenseModel.js')
const User = require('../user/userModel.js');
const jwt = require('jwt-simple');

// function to retrieve token from the request headers
const getName = (req) => {
  const token = req.headers['x-access-token'];
  let username = '';
  if (!token) {
    return null;
  }
  try {
    username = jwt.decode(token, 'secret').username;
  } catch (e) {
    return null;
  }

  return username;
};

module.exports = {
  expenses(req, res, next) {
    const username = getName(req);
    if(username === null) {
      return res.status(403).json({msg: 'Restricted Resources!'});
    }
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

  createExpense(req, res, next) {
    const username = getName(req);
    if(username === null) {
      return res.status(403).json({msg: 'Restricted Resources!'});
    }
    
  }
}