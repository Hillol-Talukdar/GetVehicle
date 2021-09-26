const express = require('express');
const middlewares = require('./middlewares');
const db = require('./database');
const globalErrorHandler = require('./controllers/handlers/errorController');

const app = express();

require('dotenv').config();

app.use(...middlewares);

db.makeDb();

app.use(globalErrorHandler);

module.exports = app;
