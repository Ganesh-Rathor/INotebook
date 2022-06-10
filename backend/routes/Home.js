const express = require('express');
const router = express.Router();
const user = require("../modules/User");

router.post('/',(req,res)=>{
   
    res.send("YOU are In Home page");
})

module.exports = router;