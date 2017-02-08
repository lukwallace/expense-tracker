const User = require('./userModel');
const jwt = require('jwt-simple');

// Helper function for 401 errors
const authError = (res) => {
  return res.status(401).json({msg: 'Authentication Error'});
};

const login = (req, res, next) => {
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
};

const signup = (req, res, next) => { 
  const { username, password, admin } = req.body;
  const newUser = new User({ username, password, admin });
  newUser.save()
  .then((userDoc) => {
    const token = jwt.encode({ username }, 'secret');
    res.json({ token });
  })
  .catch((err) => {
    authError(res);
  });
};

module.exports = {
  login,
  signup
};