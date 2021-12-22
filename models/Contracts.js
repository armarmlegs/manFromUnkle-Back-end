require("../config/database.js");
const mongoose = require("mongoose");

//création & sauvegarde des schemas &

const contractSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  options: { type: String,enum:["tout-risque", "mort-subite"] ,required: true },
  statut: { type: String, enum:["pending","active", "finished"] },
  startingDate:{type:Date},
  endingDate:{type:Date},
  
});

//creating 2 mock Contracts
const Contract = mongoose.model("Contract", contractSchema);

async function createContract() {
  const contract= [
    new Contract({
        numero: 1,
        options: "mort subite",
        statut: "active",
        startingDate:Date.now(),
        endingDate:Date.now(),
    }),
    new Contract({
        numero: 2,
        options: "mort subite",
        statut: "active",
        startingDate:Date.now(),
        endingDate:Date.now(),
    }),
  ];

  try {
    const result = await Contract.create(contract);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

// createContract();


module.exports = mongoose.model("Contract", contractSchema);