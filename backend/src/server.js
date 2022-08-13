/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

// Server Plugin
app.use(cors());
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

app.use('/api', require('./api'));

// APIs for integration testing
app.get('/', (req, res) => {
  res.send('welcome to backend service');
});

app.get('/db/status', (req, res) => {
  const status = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json(status[mongoose.connection.readyState]);
});

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
app.use((req, res) => {
  res.status(404).send('<h1> Endpoint not found.</h1>');
});

// Server listen
app.listen(3000, () => {
  console.log('server listening on http://localhost:3000.');
});
