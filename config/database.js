//connection de la db à mongoose, 

const mongoose = require("mongoose"); 


mongoose
  .connect("mongodb://localhost/unkle") 
  .then(() => console.log(".....connected to mongoDb")) 
  .catch((error) => console.error(`couldn't connect to mongoDb`));