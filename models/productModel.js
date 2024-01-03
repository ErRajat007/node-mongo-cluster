const mongoose= require('mongoose');

const products= new mongoose.Schema({
  
    product_name:{type:String, required: true},
    price:{type:Number},
    isAvailbale:{type:Boolean,required:true,default:true},
    user_id:[{type:mongoose.Schema.Types.ObjectId,ref:'users',required: true}]
    
})
   


const ProductModel = mongoose.model('products', products);
  
  module.exports = ProductModel;