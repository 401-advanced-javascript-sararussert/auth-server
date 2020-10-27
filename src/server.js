'use strict';

const express = require('express');

const app = express();
const router = require('./auth/router.js');
const secretRoutes = require('./extra-routes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use('/', secretRoutes);

module.exports = app;