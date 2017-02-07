const User = require('./userModel');
const jwt = require('jwt-simple');

const authError = (res) => {
  return res.status(401).json({msg: 'Authentication Error'});
};

// Controller for dealing with onboarding
module.exports = {
  login(req, res, next) {
    const { username, password } = req.body;
    const query = User.findOne({ username });
    query.exec()
    .then((userDoc) => {
      // No record of the user -- 401
      if(userDoc === null) {
        return authError(res);
      }
      // Compare passwords
      return userDoc.comparePasswords(password)
      .then((isMatch) => {
        if(isMatch) {
          const token = jwt.encode({ username }, 'secret');
          return res.json({ token });
        }
        // Wrong password -- 401
        return authError(res);
      })
    })
    .catch((err) => {
      console.err('[Database Error]:', err);
    });
  },

  signup(req, res, next) { 
    const { username, password, admin } = req.body;
    User.create({ username, password, admin }, function(err, userDoc) {
      if(err) {
        authError(res);
      } else {
        const token = jwt.encode({ username }, 'secret');
        res.json({ token });
      }
    });
  }
};