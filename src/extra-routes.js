'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('./auth/middleware/bearer.js');
const permissions = require('./auth/middleware/authorize.js');

router.get('/secret', bearerAuth.bearer, (req,res) => { res.send('it worked!')} );
router.get('/read', bearerAuth.bearer, permissions('read'), handleRead)
router.post('/add', bearerAuth.bearer, permissions('create'), handleAdd)
router.put('/change', bearerAuth.bearer, permissions('update'), handleChange)
router.delete('/remove', bearerAuth.bearer, permissions('delete'), handleRemove)

module.exports = router;