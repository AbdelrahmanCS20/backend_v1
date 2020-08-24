var mongoose = require('mongoose')

var AdminModel = new mongoose.model('admin',({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    password:String,
    age: Number,
    jobtitle:String,
    users:[{type:mongoose.Schema.Types.ObjectId,ref:'users'}]
}))

module.exports = AdminModel;