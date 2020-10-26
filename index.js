'use strict';

require('dotenv').config();
const app = require('./src/server.js');
const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

mongoose.connect(DB_URI, {
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false
}).then(() => {
  app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});
}).catch(err => console.log(err));