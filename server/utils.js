const jwt = require('jwt-simple');


module.exports = {
  // Function that checks for the token.
  // Has a side effect of setting _username field for req object
  // for subsequent middleware functions.
  checkAuth(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(403).json({msg: 'Restricted Resources!'});
      return next(new Error(e));
    }
    try {
      req._username = jwt.decode(token, 'secret').username;
      next();
    } catch (e) {
      res.status(403).json({msg: 'Restricted Resources!'});
      return next(new Error(e));
    }
  }
};