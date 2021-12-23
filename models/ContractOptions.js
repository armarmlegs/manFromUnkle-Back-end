require("../config/database.js");
const mongoose = require("mongoose");
const Joi = require("joi");

//création & sauvegarde des schemas &

const optionsSchema = new mongoose.Schema({
  description: { type: String, required: true },
});

function validateOptions(option) {
  const schema = Joi.object({
    description: Joi.string().required(),
  });
  return schemaValidate(option);
}

//creating 5 options

const Option = mongoose.model("Option", optionsSchema);

async function createOptions() {
  const options = [
    new Option({
      description: "Assurance tout risque",
    }),
    new Option({
      description: "Eruption Volcanique",
    }),
    new Option({
      description: "Assurance cambriolage",
    }),
    new Option({
      description: "Assurance mort par auto combustion",
    }),
    new Option({
      description: "Assurance mort subite",
    }),
  ];
  try {
    const result = await Option.create(options);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

// createOptions()

module.exports = mongoose.model("Option", optionsSchema);
module.exports.validate = validateOptions;
module.exports.Option = Option;
