// 1.Install and Require Mongoose
const mongoose = require('mongoose');

// 2.Get the MongoDB URI 
const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true";

// 3. Connect the Mongoose Uri and cal a callback function
const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{console.log("sucssesfully return db");})
};
// return the module
module.exports= connectToMongo;