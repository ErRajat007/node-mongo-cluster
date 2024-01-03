const express = require("express");
const router = express.Router();
 
const UserController = require('../controllers/UserControllers')
const ProductController = require('../controllers/ProductController')
const UploadFile = require('../controllers/UploadFileController')
//user route
router.post('/Registration',UserController.addDetails);
router.get('/getDetails',UserController.getDetails)
router.get('/getProducts',UserController.getProducts)
//product route
router.post('/addProducts',ProductController.addProduct);
router.get('/getProductsDetails',ProductController.getProducts)

// add File
router.post('/fileupload',UploadFile.addFile)


router.post('/multipalFileUpload',UploadFile.addFiles)

    
module.exports = router;