const UserModel = require('../models/userModel')
exports.addDetails = [
    async(req,res)=>{
        try{
            console.log(req.body);
            const data={
                id: req.body.id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email:req.body.email,
                gender: req.body.gender,
                ip_address: req.body.ip_address,
                roll_no: req.body.roll_no
            }
            console.log("okkk")
            // let data = await UserModel.find();

            let createData = await UserModel.insertMany(data)


        return res.json(createData)
        }catch(error){
            console.log(error)
            return res.json(error.message)
        }
    }
]


exports.getDetails=[
    async(req,res)=>{
        try{
      
        let data = await UserModel.find({first_name:"Rajat"}).populate('products')
        return res.json(data)
        }catch(error){
            console.log(error)
            return res.json(error.message)
        }
    }

]


exports.getProducts=[
    async(req,res)=>{
        try{
        let data = await UserModel.find()
        return res.json(data)
        }catch(error){
            console.log(error)
            return res.json(error.message)
        }
    }

]
