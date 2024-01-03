const ProductModel = require('../models/productModel')
exports.addProduct=[
    async(req,res)=>{
        try{
            console.log(req.body);
            let createData = await ProductModel.insertMany(req.body)
            return res.json(createData)
            
       }catch(err){
            return res.json(err.message)
        }
    }
]   

exports.getProducts=[
    async(req,res)=>{
        try{
           
            let data = await ProductModel.find().populate('user_id','first_name last_name').exec()

            return res.json({data:data})
            
       }catch(err){
            return res.json(err.message)
        }
    }
]   