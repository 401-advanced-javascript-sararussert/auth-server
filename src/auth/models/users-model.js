'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  role: { type: String, required: true, enum: ['user', 'admin', 'editor', 'user'] }
});

const capabilities = {
  admin: ['read', 'create', 'update', 'delete'],
  writer: ['read', 'create'],
  editor: ['read', 'update'],
  user: ['read'],
}

UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.statics.authenticateBasic = async function (username, password) {
  return this.findOne({ username })
    .then(async user => {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = await user.generateToken();
        return token;
      }
    });
}


UserSchema.methods.generateToken = async function () {
  let token = await jwt.sign({ username: this.username }, 'SECRET_STRING');
  return token;
}


module.exports = mongoose.model('Users', UserSchema);