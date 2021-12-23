const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Contract = require("../models/Contracts.js");
const validate = require("../models/Contracts.js");
const {Option} = require('../models/ContractOptions');

//get all Contracts
router.get("/", async (req, res) => {
  const contract = await Contract.find().populate('options').sort("numero");
  res.send(contract);
});

//get One Contract

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const contract = await Contract.findById(req.params.id);

  if (!Contract)
    return res
      .status(404)
      .send("The Contract with the given ID was not found.");

  res.send(contract);
});

//create One Contract;
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const option = await Option.findById(req.body.optionId);
  if(!option) return res.status(400).send('Invalid Option')

  let contract = new Contract({
    numero: req.body.numero,
    options: [''],
    status: req.body.status,
    startingDate: req.body.startingDate,
    endingDate: req.body.endingDate,
  });
  contract = await contract.save();
  res.send(contract);
});

//update a contract

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const contract = await Contract.findByIdAndUpdate(
    req.params.id,
    {
      numero: req.body.numero,
      options: req.body.options,
      status: req.body.status,
      startingDate: req.body.startingDate,
      endingDate: req.body.endingDate,
    },
    { new: true }
  );
  if (!contract) return res.status(404).send("no contract with this Id");
  res.send(contract);
  console.log("user updated");
});

//deleting a user:

router.delete("/:id", async (req, res) => {
  const contract = await Contract.findByIdAndDelete(req.params.id);
  if (!contract) return res.status(404).send("no user with this id");
  res.send(contract);
  console.log("contract deleted");
});

module.exports = router;
