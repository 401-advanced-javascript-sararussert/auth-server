'use strict';

const mongoose = require('mongoose');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true }
});

userSchema.methods.authenticateUser = async function() {
  let username = this.username;
  let password = this.password;
  let hashedPassword = await bcrypt.hash(password, 10);
  this.password = hashedPassword
  return this;
}

userSchema.methods.generateTokens = async function() {
  let token = jwt.sign({ username: this.username }, 'SECRET_STRING');
  console.log('we are inside generate tokens ');
  return token;
}

let CoolSchema = mongoose.model('users', userSchema);


module.exports = CoolSchema;