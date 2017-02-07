const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const SALT_ROUNDS = 10;

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    require: true,
  },
});

userSchema.methods.comparePasswords = function (candidatePassword) {
  const savedPassword = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, savedPassword, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

userSchema.pre('save', function(next) {
  const userDoc = this;
  bcrypt.hash(userDoc.password, SALT_ROUNDS, function(err, hash) {
    if(err) {
      next(err);
      return;
    }
    userDoc.password = hash;
    next();
  });
});

const User = mongoose.model('User', userSchema);
module.exports = User;
