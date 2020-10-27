'use strict';

const express = require('express');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const userModel = require('./auth/models/users-model.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', signupHandler);
app.post('/signin', authBasic, signinHandler)

function authBasic(req, res, next) {
  const decodedString = base64.decode(req.headers.authorization.split(' ')[1]);
  let [user, pass] = decodedString.split(':');
  bcrypt.compare(pass, this[user].password);// how does it access the database?
  console.log(isValidPassword);
  if (isValidPassword) {
    next()
  } else {
    // return the Promise.reject method 
    return Promise.reject('no user found');
  }
}

function signupHandler(req, res, next) {
  try {
    let newUser = new userModel(req.body);
    newUser.authenticateUser()
      .then(results => {
        results.save()
          .then(results => {
            results.generateTokens()
              .then(results => res.send(results))
          })
      });
  } catch(e) {console.log(e)}
  
}

function signinHandler(req, res, next) {
  let user = new userModel(req.body);
  user.generateTokens()
    .then(results => res.status(200).send(results))

}


module.exports = app;