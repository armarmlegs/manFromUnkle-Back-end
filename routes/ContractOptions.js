const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Option  = require("../models/ContractOptions");

//get all options

router.get('/', async(req,res)=>{
    const options = await Option.find().sort('name')
    res.send(options)
});
//delete an option

router.delete('/:id', async (req,res)=>{
    const options = await Option.findByIdAndDelete(req.params.id);
    if (options) return res.status(404).send("no options with this id")
})





module.exports=router