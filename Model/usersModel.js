const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({

    mail:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    job:{
        type:String,
        required:true
    }



},{timestamps:true});

const Users = mongoose.model("myUsers",usersSchema);

module.exports = Users;