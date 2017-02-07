const bodyParser = require('body-parser');

module.exports = (app, express) => {
  //JSON body parser
  app.use(bodyParser.json());

  //CORS Headers
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });
};
