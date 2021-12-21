const mongoose = require("mongoose"); //calling mongoose  we will use it for building the database


mongoose
  .connect("mongodb://localhost/unkle") // hardcoded, will use an env variable later, here we have named the db
  .then(() => console.log(".....connected to mongoDb")) // promise successful, we print this message to notify.
  .catch((error) => console.error(`couldn't connect to mongoDb`));