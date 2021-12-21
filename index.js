
const mongoose = require('mongoose'); //calling mongoose  we will use it for building the database
mongoose.connect('mongodb://localhost/unkle') // hardcoded, will use an env variable later, here we have named the db
.then(()=>console.log('.....connected to mongoDb')) // promise successful, we print this message to notify.
.catch((error)=> console.error(`couldn't connect to mongoDb`))

const express = require('express')

// Create the express app
const app = express()

// Routes and middleware
// app.use(/* ... */)
// app.get(/* ... */)

// Error handlers
app.use(function fourOhFourHandler (req, res) {
  res.status(404).send()
})
app.use(function fiveHundredHandler (err, req, res, next) {
  console.error(err)
  res.status(500).send()
})

// Start server
app.listen(1234, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log('Started at http://localhost:1234')
})
