const _ = require("lodash");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/Users.js");
const validate = require("../models/Users.js");
const { Contracts } = require("../models/Contracts");
const { Option } = require("../models/ContractOptions");
const bcrypt = require("bcrypt");
const admin = require("../middleWares/admin");

//get all Users  with contracts & options
router.get("/" /*admin*/, async (req, res) => {
  console.log(req.session);
  const user = await User.find()
    .populate({
      path: "contract",
      populate: [
        {
          path: "options",
        },
      ],
    })
    .sort("name");
  res.send(user);
});

//get One User with contracts & options

router.get("/:id" /*admin*/, async (req, res) => {
  console.log(req.params.id);
  const user = await User.findById(req.params.id).populate({
    path: "contract",
    populate: [
      {
        path: "options",
      },
    ],
  });

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

//create One User;
router.post("/", /*admin*/ async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = new User(_.pick(req.body, ["name", "email", "password", "role"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();
  res.send(_.pick(user, ["_id", "name", "email", "role"]));
});

//update a User;

router.put("/:id", /*admin*/ async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!user) return res.status(404).send("no user with this Id");
  res.send(user);
  console.log("user updated");
});

//add || update a contract to a user :
router.patch("/:id/addContract", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const contractId = req.body.contract;
  console.log(contractId);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $push: { contract: [contractId] } },
    { new: true }
  );
  if (!user) return res.status(404).send("no user with this Id");

  res.send(user);
  console.log("contract updated");
});

//delete a user

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("no user with this id");
  res.send(user);
  console.log("user deleted");
});

module.exports = router;
