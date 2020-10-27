'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./auth/middleware/bearer.js');

router.get('/secret', bearerMiddleware.bearer, (req,res) => { res.send('it worked!')} );

module.exports = router;