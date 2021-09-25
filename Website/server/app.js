const express = require('express');
const middlewares = require('./middlewares');
const db = require('./database');

const app = express();

require('dotenv').config();

app.use(...middlewares);

db.makeDb();

module.exports = app;
