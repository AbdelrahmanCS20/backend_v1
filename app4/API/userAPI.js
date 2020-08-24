var mongoose = require('mongoose')
var userModel = require('../model/userModel');
var adminModel = require('../model/adminModel');
var authenticate = require('../Authentication');

function userAPI(app){

app.post('/createuser',authenticate,async(req,resp)=>{

const{_id,name,age,phone,admin} = req.body;

let user = new userModel({
    _id:mongoose.Types.ObjectId(),
    name,
    age,
    phone,
    admin
})
await user.save();
let currentuser = await adminModel.findOne({_id:admin}).exec();
currentuser.users.push(user._id);
currentuser.save((err,data)=>{
resp.json({result:data,error:err})
})
})

app.get('/getallusers',authenticate,async(req,resp)=>{
    let user =await userModel.find({}).populate('admin');

    resp.json({message:"All users",result:user})
})

app.post('/updateuser',authenticate,async(req,resp)=>{
    const{name,phone} = req.body;
     let user =await userModel.findOne({name}).update({phone})
     resp.json({message:"user update successfully...",result:user})
})

app.post('/removeuser',authenticate,async(req,resp)=>{
    const{_id} = req.body;
    let removeuser =await userModel.findOne({_id}).remove();
    resp.json({message:"user has deleted successfully."})
})

}
module.exports = userAPI