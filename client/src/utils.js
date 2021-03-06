// Helper file for handling jwt token storage
module.exports = {
  storeToken(token) {
    window.localStorage.setItem('expense-tracker', token);
  },

  getToken() {
    if (window.localStorage === undefined) {
      return undefined;
    }
    return window.localStorage.getItem('expense-tracker');
  },

  removeToken() {
    window.localStorage.removeItem('expense-tracker');
  },
};