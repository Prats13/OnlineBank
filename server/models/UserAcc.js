const { text } = require('body-parser');
const mongoose = require('mongoose');

const AccSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    CurrBalance:{
        type:Number,
        required:true
    },
    pin:{
        type:Number,
        required:true
    },
    AccountNo:{
        type:String,
        required:true
    },
    MobileNo:{
        type:Number,
        required:false
    },
    Email:{
        type:String,
        required:false
    },
    Country:{
        type:String,
        required:false
    }
});

module.exports = Login = mongoose.model('AccData', AccSchema);