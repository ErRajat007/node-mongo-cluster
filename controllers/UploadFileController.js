const multer = require('multer');
const FileModel = require('../models/fileModel')
const fs = require('fs');
const { isUtf8 } = require('buffer');
// const FILE_TYPE_MAP = {
//     'image/png': 'png',
//     'image/jpeg': 'jpeg',
//     'image/jpg': 'jpg',
// }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // const isValid = FILE_TYPE_MAP[file.mimetype];
        // console.log("isValid "+isValid)
        // let uploadError = new Error('Invalid Image Type');
        // if(isValid){
        //     console.log("okkk dear ");
        //     uploadError = null
        // }
        let  uploadError = null
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        console.log(file)
        const fileName = file.originalname.split('').join('-');       
        cb(null, `${fileName}-${Date.now()}.${ file.originalname}`)
    }
})

const upload  = multer({ storage: storage })


exports.addFile=[
    upload.single('image'),
    async(req,res)=>{
        try{ 
            const file = req.file;
            console.log(file.path)
            fs.readFile(file.path, 'utf8', (err, data) => {
              if (err) {
                console.error('Error reading the file:', err);
                return;
              }
            
              // Split the file content into lines
              const lines = data.split('\n');
            
              // Initialize a variable to store the sum
              let sum = 0;
            
              lines.forEach((line, index) => {
               
                // Split each line into two values
                const values = line.split(' ');
            
                // Ensure that there are two values on each line
                if (values.length === 2) {
                  // Convert the second value to a number and add to the sum
                  const value = parseFloat(values[1]);
                  if (!isNaN(value)) {
                    sum += value;
                  } else {
                    console.error(`Error parsing value on line ${index + 1}`);
                  }
                } else {
                  console.error(`Invalid format on line ${index + 1}`);
                }
              });
              // Print the sum in one line
              console.log('Sum of all values:', sum);
            });
            if (!file){
                return res.status(400).json('No image in the request')
            }else{
            // Log protocol and host for debugging
            console.log('Protocol:', req.protocol);
            console.log('Host:', req.get('host'));

            const fileName = file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
                return res.status(200).json({message:'upload success',fileName:fileName,BaseUrl:basePath})
            }
            
       }catch(err){
            return res.json(err.message)
        }
    }
]   


// exports.addFiles=[
//     upload.array('files'),
//     async(req,res)=>{
//         try{
           
//             const files = req.files;
//             if (!files || files.length === 0){
//                 return res.status(400).json('No file in the request')
//             }else{
//                 const fileDetails = files.map(file => ({
//                     fileName: file.filename,
//                     filePath: file.path,
//                   }));

          
//                 return res.status(200).json({message:'upload success',fileDetails})
//             }
            
//        }catch(err){
//             return res.json(err.message)
//         }
//     }
// ]   



exports.addFiles = [
    upload.array('files'),
    async (req, res) => {
      try {
        const files = req.files;
       
        if (!files || files.length === 0) {
          return res.status(400).json('No file in the request');
        } else {
          // Parse JSON from the request body, if present
          let jsonPayload = null;
          if (req.body && req.body.jsonData) {
            jsonPayload = JSON.parse(req.body.jsonData);
          }
  
          const fileDetails = files.map((file) => ({
            fileName: file.filename,
            filePath: file.path,
          }));
  
          return res.status(200).json({
            message: 'upload success',
            fileDetails,
            jsonPayload,
          });
        }
      } catch (err) {
        return res.json(err.message);
      }
    },
  ];
  











// router.post('/', upload.single('image'), async (req, res) => {

//     if(!mongoose.isValidObjectId(req.params.id)){
//         res.status(400).send('Invalid Product ID')
//     }

//     const category = await Category.findById(req.body.category);
//     if (!category)
//         return res.status(400).send('Invalid Category')

//     const file = req.file;
//     if (!file)
//         return res.status(400).send('No image in the request')

//     const fileName = file.filename;
//     const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

//     let product = new Product({
//         name: req.body.name,
//         description: req.body.description,
//         richDescription: req.body.richDescription,
//         image: `${basePath}${fileName}`,
//         brand: req.body.brand,
//         price: req.body.price,
//         category: req.body.category,
//         countInStock: req.body.countInStock,
//         rating: req.body.rating,
//         numReviews: req.body.numReviews,
//         isFeatured: req.body.isFeatured
//     })

//     product = await product.save();

//     if (!product)
//         return res.status(500).send('Product cannot be created')

//     res.send(product);
// })




// router.put('/gallery-images/:id', upload.array('images', 10), async (req, res) => {

//     if (!mongoose.isValidObjectId(req.params.id)) {
//         res.status(400).send('Invalid Product ID')
//     }

//     const files = req.files;
//     let imagesPaths = [];
//     const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
//     if(files){
//         files.map(file => {
//             imagesPaths.push(`${basePath}${file.fileName}`);
//         })
//     }

//     const product = await Product.findByIdAndUpdate(req.params.id, {

//         image: imagesPaths,
//     },
//     {
//         new: true
//     })

//     if (!product)
//         return res.status(500).send('Product cannot be updated')
//     res.send(product);
// })

// module.exports = router;