require("./config/database.js");
const express = require("express");
const session = require("express-session");
const auth = require("./routes/auth");
const user = require("./routes/User");
const contract = require("./routes/Contract");
const options = require("./routes/ContractOptions");

// Create the express app
const app = express();

// me permet la persistence du cookie dans mongoDb
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/unkle" }),
  })
);

// Routes and middleware
app.use(express.json());

// utilisation des routes:

app.use("/api/users", user);
app.use("/api/auth", auth);
app.use("/api/contracts", contract);
app.use("/api/options", options);

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
