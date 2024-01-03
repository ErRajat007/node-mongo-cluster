const mongoose= require('mongoose');

// const users= new mongoose.Schema({
//     fullName:{type:String, required: true},
//     email:{type:String, requires:true},
//     password:{type:String,required:false},
//     role:{type:String,required:true,default:"User"},
//     deviceId  : { type : String, default : '' },
//     fcmToken : { type : String, default : '' },
// })
const users= new mongoose.Schema({
    id:{type:String,required: true,uniq:true},
    first_name:{type:String, required: true},
    last_name:{type:String, required: true},
    email:{type:String, required:true, unique: true},
    gender:{type:String, required: true},
    ip_address:{type:String},
    roll_no:{type:Number},
    products:[{type:mongoose.Schema.Types.ObjectId,ref:'products',required: true}]
})
   


const UserModel = mongoose.model('users', users);
  
  module.exports = UserModel;