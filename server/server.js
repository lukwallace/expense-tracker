const express = require('express');
const mongoose = require('mongoose');
const app = express();


// Connect to database
mongoose.connect('mongodb://localhost/expense-tracker');
mongoose.connection.on('open', () => {
  // console.log('Mongoose connection open!');
});

require('./middleware')(app, express);
require('./api')(app, express);

// This if-else statement is here so that the server tests can run
if(module.parent) {
  module.exports = app;
} else {
  app.listen(3001, () => console.log('Listening on port 3001!'));  
}
