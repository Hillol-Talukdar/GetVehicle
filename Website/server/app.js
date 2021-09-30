const express = require('express');
const middlewares = require('./middlewares');
const db = require('./database');
const router = require('./routes');
const globalErrorHandler = require('./controllers/handlers/errorController');

const app = express();

require('dotenv').config();

app.use(...middlewares);

// db.makeDb();

router.registerApplicationRoutes(app);

app.use(globalErrorHandler);

module.exports = app;
