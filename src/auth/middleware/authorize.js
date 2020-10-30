'use strict';

// what are the capavilities within the token

// Do the capabilities meet the requirements for this route

// function currying: a function that returns another function

module.exports = function (capability) {
  return function (req, res, next) {

    try {

      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        next('Access Denied');
      }

    } catch (e) {
      console.log(e);
      next("Invalid token");
    }
  }
}