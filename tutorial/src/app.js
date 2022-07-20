const express = require('express');
const app = express();
const router = express.Router();
//Rotas
const index = require('./routes/index');
const dataRoute = require('./routes/dataRoute');
app.use('/', index);
app.use('/data', dataRoute);
module.exports = app;
