import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
fileURL:{
    type:String,
},
fileName:{
    type:String,
},

});

export  default  mongoose.model("aws", userSchema,"aws");
