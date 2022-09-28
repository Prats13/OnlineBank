const { text } = require('body-parser');
const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    AccountNo:{
        type:String,
        required:true
    }
});

module.exports = Login = mongoose.model('userData', LoginSchema);