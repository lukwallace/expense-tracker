const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../server.js');
const User = require('../user/userModel.js');
const jwt = require('jwt-simple');

const request = supertest.agent(server);

// Dummy Data
const username = 'Doug';
const password = 'Dimmadome';

after((done) => {
  User.remove({ username }).exec();
  done();
});

describe('Meta Testing:', () => {
  it('should be a functioning test', () => {
    expect(true).to.equal(true);
  });
});

describe('Signing Up:', () => {
  it('should respond with a token on sign up', (done) => {
    request.post('/api/signup')
      .send({ username, password, admin: false }).end((err, res) => {
        token = res.body.token;
        expect(token).to.not.be.undefined;
        decodedToken = jwt.decode(token, 'secret');
        expect(decodedToken.username).to.equal(username);
        done();
      });
  });
});

describe('Logging in:', () => {
  it('should 401 an invalid log in', (done) => {
    request.post('/api/login')
      .send({ username: 'nonexistantUser', password: 'Blah' }).end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should respond with a token on log in', (done) => {
    request.post('/api/login')
      .send({ username, password }).end((err, res) => {
        token = res.body.token;
        expect(token).to.not.be.undefined;
        decodedToken = jwt.decode(token, 'secret');
        expect(decodedToken.username).to.equal(username);
        done();
      });
  });
});