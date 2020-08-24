var mongoose = require('mongoose')
var AdminModel = require('../model/adminModel');


function AdminABI(app) {
    app.post('/signup', async (req, resp) => {
        const { name, password, age, jobtitle } = req.body;
        let admin = new AdminModel({
            _id: mongoose.Types.ObjectId(),
            name,
            password,
            age,
            jobtitle
        })
        await admin.save()
        resp.send({ message: "admin created succesfully" })

    });
    app.post('/signin', async (req, resp) => {
        const { name, password } = req.body;
        let foundadmin = await AdminModel.findOne({ name: name, password: password });
        if (foundadmin) {
            req.session.user = foundadmin;
            resp.json({ message: 'login sucessfylly', token: req.sessionID })
        } else {
            resp.json({ status: "unauthorized..." })
        }

    })
    

    app.get('/getalladmin', async (req, resp) => {
        if(req.session.user){
            let output = await AdminModel.find({});
            resp.json({result:output})
        }else{
            resp.json({error:"cannot get data...."})
        }
    })

    app.post('/updateadmin', async (req, resp) => {
        const {name,age } = req.body;
        if(req.session.user){
        var admin = await AdminModel.findOne({ name: name }).update({age:age}, (data, err) => {
            resp.json({ message: "updated successfully..."});
        })}else{
            resp.json({message:'cannot update...'})
        }
    });
    app.post('/logout',(req,resp)=>{
     const {token} = req.body;
     if(token === req.sessionID){
         req.session.destroy();
         resp.json({message:'logged out '})
     }else{
         resp.json({message:"invaled_Token......"})
     }
    })
}

module.exports = AdminABI;