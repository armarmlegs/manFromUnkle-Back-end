require("../config/database.js");
const Joi = require("Joi");
const mongoose = require("mongoose");

//création & sauvegarde des schemas &

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "client"], required: true }, // creating two options to choose from
});


//input validation using JOI
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  });
  return schema.validate(user);
}


//creating 2 mock users
const User = mongoose.model("User", userSchema);

async function createUser() {
  const user = [
    new User({
      name: "Bouba",
      email: "boobs@boobs.com",
      password: "1234",
      role: "admin",
    }),
    new User({
      name: "Unkle",
      email: "unkle@boobs.com",
      password: "1234",
      role: "client",
    }),
  ];

  try {
    const result = await User.create(user);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

// createUser();


module.exports = mongoose.model("User", userSchema);
module.exports.validate = validateUser;