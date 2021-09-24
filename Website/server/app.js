const express = require('express');
const db = require('./database');

const app = express();

require('dotenv').config();

db.makeDb();

module.exports = app;
