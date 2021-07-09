const express = require('express');
const filesRouter = require('./routes/filesRouter')
const app = express();
const morgan = require('morgan')
app.use(morgan('dev'));



app.use('/api/v1/', filesRouter);


module.exports = app;
