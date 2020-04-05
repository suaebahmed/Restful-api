const router = require('express').Router();
const Product = require('../models/Products');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString()+file.originalname);
    }
})
const upload = multer({
    storage: storage,
    // fileFilter:
    limits: {
        fileSize: 1024 * 1020 * 8
    }
})

router.post('/',upload.single("myPic"),checkAuth,(req,res)=>{
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });
console.log(req.file) // check file found or not

newProduct.save()
        .then((data)=>{
        return res.status(200).json({
            msg: 'successfully new product created',
            request: {
                type: 'POST',
                url: 'https://localhost:3000/products'
            }
        })
        })
        .catch(err=>{
            return res.status(500).json({
                msg: 'catch an err',
                Error: err
            })
        })
});

router.get('/',(req,res)=>{
    Product.find()
        .select('name price _id')
        .limit(10)
        .sort({"price": 1})
        .exec()
        .then(result=>{
            var response = result.map(data=>{
                return {
                    name: data.name,
                    price: data.price,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/'+data._id
                    }
                }
            });
            return res.status(200).json({
                msg: 'your data',
                count: result.length,
                product: response
            })
        })
        .catch(err=>{
            return status(500).json({
                msg: 'catch an err',
                Error: err
            })    
        })
});

router.get('/:productId',(req,res)=>{
var id= req.params.productId;
Product.findById(id)
        .exec()
        .then(data=>{
        // console.log('form data: '+data)
        return res.status(200).json({
                msg: 'successfully you got result',
                _id: data._id,
                name: data.name,
                price: data.price,
                request: {
                    type: 'GET',
                    //url: 'http://localhost:3000/products/'+_id   --//wrong
                    url: 'http://localhost:3000/products/'+data._id
                }
            })
        })
        .catch(err=>{
               res.status(500).json({
                msg: 'catch an err',
                Error: err
            })    
        });
})
router.delete('/:id',(req,res)=>{
    var id= req.params.id;
    Product.remove({_id: id})
            .then(()=>{
                return res.status(200).json({
                    msg: 'this product is deleted',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/'
                    }
                })
            })
            .catch(err=>{
                return res.status(500).json({
                    msg: 'catch an err',
                    Error: err
                })    
            });
    });
router.patch('/:id',(req,res)=>{
    var id= req.params.id;
    const updateP = {
        name: req.body.name,
        price: req.body.price
    }
    Product.update({_id: id},updateP)
            .then(()=>{
                return res.status(200).json({
                    msg: 'this product is updata',
                    name: updateP.name,
                    price: updateP.price,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/'
                    }
                })
            })
            .catch(err=>{
                return res.status(500).json({
                    msg: 'catch an err',
                    Error: err
                })    
            });
    })

module.exports = router;