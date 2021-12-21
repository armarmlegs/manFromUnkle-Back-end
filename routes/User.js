const express = require("express");
const Joi = require("Joi");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/Users.js");

//get all Users
router.get("/", async (req, res) => {
  console.log("hello");
  const user = await User.find().sort("name");
  res.send(user);
});

//get One User

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

//create One User;
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
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
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  }, {
      new:true
  });
  if(!user) return res.status(404).send('no user with this id');
  res.send(user)
  console.log('user updated')
});


router.delete('/:id', async (req,res)=>{
    const user =  await User.findByIdAndDelete(req.params.id);
    if(!user) return res.status(404).send('no user with this id');
    res.send(user);
    console.log('user deleted')
})

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  });
  return schema.validate(user);
}

module.exports = router;
