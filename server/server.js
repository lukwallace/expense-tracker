const express = require('express');
const app = express();

require('./middleware')(app, express);
require('./api')(app, express);

app.listen(3001, () => console.log('Backend listening on port 3001!'));