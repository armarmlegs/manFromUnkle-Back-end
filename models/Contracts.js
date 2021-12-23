require("../config/database.js");
const mongoose = require("mongoose");
const Joi = require("joi");
const { optionsSchema } = require("./ContractOptions");

//création & sauvegarde des schemas &

const contractSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  options: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Option",
  }],
  statut: { type: String, enum: ["pending", "active", "finished"] },
  startingDate: { type: Date },
  endingDate: { type: Date },
});

//input validation using JOI
function validateContract(contract) {
  const schema = Joi.object({
    numero: Joi.number().required(),
    statut: Joi.string(),
    startingDate: Joi.date(),
    endingDate: Joi.date(),
  });
  return schema.validate(contract);
}
//creating 2 mock Contracts
const Contract = mongoose.model("Contract", contractSchema);

async function createContract() {
  const contract = [
    new Contract({
      numero: 1,
      options: ['61c33d9e45e4c9393735d3e0', '61c33d9e45e4c9393735d3e3'],
      statut: "active",
      startingDate: Date.now(),
      endingDate: Date.now(),
    }),
    new Contract({
      numero: 2,
      statut: "active",
      startingDate: Date.now(),
      endingDate: Date.now(),
    }),
  ];

  try {
    const result = await Contract.create(contract);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function listContracts() {
  const contracts = await Contract
  .find()
  .populate('options')
  console.log(contracts)
}

// listContracts()
// createContract()


module.exports = mongoose.model("Contract", contractSchema);
module.exports.validate = validateContract;
