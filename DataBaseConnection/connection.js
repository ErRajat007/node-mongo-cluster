const mongoose = require('mongoose')
const url='mongodb+srv://rajatchoudhary:Rajat_123@cluster0.jisko1w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
         
    mongoose.connect(url)
        .then(() => {
            console.log('MongoDB connected successfully');
            // Your application logic here
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
        });

module.exports=mongoose;