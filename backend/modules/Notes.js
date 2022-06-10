// require mongoose and Schema(optional)
const mongoose = require('mongoose');

const date = new Date;

// Create a user Schema "new" is need
const NotesSchema = new mongoose.Schema({
// Thise is for conecting Notes to user
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},

    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:date
    },
    tag:{
        type:String,
        default:"Genral"
    },
    description:{
        type:String,
        required:true
    }
})
// return mongoose.module ("name",schema fomated)
module.exports = mongoose.model("Notes",NotesSchema);