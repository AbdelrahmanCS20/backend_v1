var mongoose = require('mongoose')

var userModel = new mongoose.model('users',{
_id:mongoose.Schema.Types.ObjectId,
name:String,
age:Number,
phone:Number,
admin:{type:mongoose.Schema.Types.ObjectId , ref:'admin'}

})

module.exports = userModel