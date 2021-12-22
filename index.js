const Joi = require('Joi');
require("./config/database.js");
const express = require("express");


const user = require('./routes/User');
const contract = require('./routes/Contract');



// Create the express app
const app = express();
// const bodyParser = require('body-parser')

// Routes and middleware
app.use(express.json());
app.use('/api/users', user);
app.use('/api/contracts', contract)


// Error handlers
app.use(function fourOhFourHandler(req, res) {
  res.status(404).send();
});
app.use(function fiveHundredHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send();
});

// Start server

port = process.env.PORT || 3000;

app.listen(port, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log(`Started at http://localhost:${port}`);
});
