// Helper file for handling network requests
// Functions return a promise

const SERVER = process.env.SERVER || 'http://localhost:3001'

const post = (endpoint, payload, headers) => {
  const base = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  headers = Object.assign(base, headers);
  return fetch(SERVER + endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }) 
  .then(res => res.json())
  .catch(err => err);
};

const getExpenses = (token) => {
  return fetch(SERVER + '/api/expenses', { headers: { 'x-access-token': token } })
  .then(res => res.json())
  .catch(err => err);
};

const submitExpense = (state) => {
  let { token, datetime, amount, description } = state;
  const header = { 'x-access-token': token };
  datetime = +datetime.format('x');
  return post('/api/expense', { datetime, amount, description }, header);
};


module.exports = {
  post,
  getExpenses,
  submitExpense
};