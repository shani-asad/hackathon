/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv/config');

// Routes
const notesRouter = require('./Routes/notes.routes');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect DB
const dbURI = process.env.DB_CONNECTION;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log(err));

app.use('/notes', notesRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// error handler
app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: 'Sorry, there is error in our server',
  });
});

// Server listen
app.listen(3000);
