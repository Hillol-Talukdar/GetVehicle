const express = require('express');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');

module.exports = [
    express.json({ limit: '2mb' }),
    express.urlencoded({ extended: true }),
    compression(),
    cookieParser(),
    cors(),
    helmet(),
    mongoSanitize(),
    morgan('tiny'),
    xss(),
];
