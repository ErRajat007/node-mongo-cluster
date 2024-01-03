const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/mydatabase').then(()=>{console.log('connected');})
mongoose.connect('mongodb+srv://rajatchoudhary:Rajat_123@cluster0.jisko1w.mongodb.net/mongoTest?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{console.log('connected');})
module.exports=mongoose;