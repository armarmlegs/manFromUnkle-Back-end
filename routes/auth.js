const express = require("express");
const Joi = require("joi");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/Users");
const bcrypt = require("bcrypt");


//Authentification d'un utilisateur, utile afin de recuperer req.session.user pour les autorisations

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    console.log(req.sessionID)
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("invalid credentials");

  const validPassword = await bcrypt.compare(req.body.password, user.password); //bcrypt permet de brouiller un mot de passe

  if (!validPassword) return res.status(400).send("invalid credentials");

  req.session.user = { email, password };

  console.log(req.session.user);

  res.json(req.session);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(req);
}

module.exports = router;
