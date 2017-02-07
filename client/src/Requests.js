const SERVER = process.env.SERVER || 'http://localhost:3001'

module.exports = {
  post(endpoint, payload) {
    return fetch(SERVER + endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }) 
    .then(res => res.json())
    .catch(err => err);
  },

  getExpenses(token) {
    return fetch(SERVER + '/api/expenses', { headers: { 'x-access-token': token } })
    .then(res => res.json())
    .catch(err => err);
  }
};