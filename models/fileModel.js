const mongoose= require('mongoose');


const files= new mongoose.Schema({
   
    filename:{type:String, required: true},
    path:{type:String, required: true},

    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
  
})
   


const FilesModel = mongoose.model('files', files);
  
  module.exports = FilesModel;