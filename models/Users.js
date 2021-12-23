require("../config/database.js");
const Joi = require("Joi");
const mongoose = require("mongoose");
const { optionsSchema } = require("./ContractOptions.js");
const { Contracts } = require("./Contracts");

//création & sauvegarde des schemas &

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contract: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contract",
  },
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
  User.remove({})
  const user = [
    new User({
      name: "Bouba",
      email: "boobs@boobs.com",
      password: "1234",
      role: "admin",
      contract: "61c3be72006018ea4b2c4810",
    }),
    new User({
      name: "Unkle",
      email: "unkle@boobs.com",
      password: "1234",
      role: "client",
      contract: "61c3bc032b66b49ef907b695",
    }),
  ];

  try {
    const result = await User.create(user);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function listUsers() {
  const users = await User.find().populate({
    path: "contract",
    populate: { path: "options" },
  });
  console.log(users);
}

createUser()


listUsers();

module.exports = mongoose.model("User", userSchema);
module.exports.validate = validateUser;
