const userController = require('./user/userController');
const expenseController = require('./expense/expenseController');

module.exports = (app) => {
  /* UNRESTRICTED ROUTES */

  /* Check to see if username and password match and if so assign session token */
  app.post('/api/login', userController.login);

  /* Store newly created username and password and assign session token */
  app.post('/api/signup', userController.signup);

  /* RESTRICTED ROUTES */

  /* Gets expenses based on user role */
  app.get('/api/expenses', expenseController.expenses);
};