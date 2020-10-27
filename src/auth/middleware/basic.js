'use strict';

const base64 = require('base-64');
const Users = require('../models/users-model');
const jwt = require('jsonwebtoken');

module.exports = {
  basic: async (req, res, next) => {

    if (req.headers.authorization) {

      const encodedPassword = req.headers.authorization.split(' ')[1];
      const decodedPassword = base64.decode(encodedPassword);
      const [user, pass] = decodedPassword.split(':');

      let token = await Users.authenticateBasic(user, pass);
      req.token = token;
      next();
    } else {
      next('Unautorized');
    }
  }
}