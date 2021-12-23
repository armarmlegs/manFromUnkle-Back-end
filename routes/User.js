const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/Users.js");
const validate = require("../models/Users.js");
const { Contracts } = require("../models/Contracts");
const { Option } = require("../models/ContractOptions");

//get all Users  with contracts & options
router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  user = await user.save();
  res.send(user);
});

//update a User;

router.put("/:id", async (req, res) => {
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
  console.log(contractId)

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
