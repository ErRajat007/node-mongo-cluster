const express= require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const path = require('path');
require('dotenv').config()
const apiRouter = require('./Router/router')
let Port= process.env.Port||3000;
const app=express();

app.use(cors());
app.options('*',cors());

app.use(bodyParser.json());

// app.use(bodyParser.json({ extended: true, limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/public', express.static('public'));
//databse connection jis file se karna usse kar sakte hai 
// const connectDB=require('./DataBaseConnection/mongo') 
const connectDB = require('./DataBaseConnection/connection')

//for video path load
app.use(express.static(path.join(__dirname, 'public/uploadVideos')));
// for image path load
app.use(express.static(path.join(__dirname, 'public/uploadImages')));

app.use('/',apiRouter)
// connectDB().then(()=>{
//     app.listen(Port,()=>{
//         console.log(`server start at ${Port}`)
//     })
//     })
app.listen(Port,()=>{
        console.log(`server start at ${Port}`)
    })
