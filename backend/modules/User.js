// require mongoose and Schema(optional)
const mongoose = require('mongoose');
const {Schema} = mongoose;

// Create a user Schema "new" is need
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    passward:{
        type:String,
        required:true
    }

})
// return mongoose.module ("name",schema fomated)
const user =  mongoose.model("User",userSchema);
module.exports = user;