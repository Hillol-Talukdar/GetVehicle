const express = require('express');
const middlewares = require('./middlewares');
const db = require('./database');
const router = require('./routes');
const globalErrorHandler = require('./controllers/handlers/errorController');
const AppError = require('./utils/appError');

const app = express();

require('dotenv').config();

app.use(...middlewares);

db.makeDb();

router.registerApplicationRoutes(app);

app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
