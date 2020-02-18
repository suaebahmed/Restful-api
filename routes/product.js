const router = require('express').Router();
const Product = require('../models/Products')

router.post('/',(req,res)=>{
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });
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
            return status(500).json({
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
                        url: 'https://localhost:3000/products/'+data._id
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

router.get('/:id',(req,res)=>{
var id= req.params.id;
Product.findOne({_id: id})
        .then(data=>{
            return res.status(200).json({
                msg: 'successfully you got result',
                name: data.name,
                price: data.price,
                _id: data._id,
                request: {
                    type: 'GET',
                    url: 'https://localhost:3000/products/'+_id
                }
            })
        })
        .catch(err=>{
            return status(500).json({
                msg: 'catch an err',
                Error: err
            })    
        });
})
router.get('/:id',(req,res)=>{
    var id= req.params.id;
    Product.remove({_id: id})
            .then(()=>{
                return res.status(200).json({
                    msg: 'this product is deleted',
                    request: {
                        type: 'GET',
                        url: 'https://localhost:3000/products/'+_id
                    }
                })
            })
            .catch(err=>{
                return status(500).json({
                    msg: 'catch an err',
                    Error: err
                })    
            });
    });
router.post('/:id',(req,res)=>{
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
                        url: 'https://localhost:3000/products/'+_id
                    }
                })
            })
            .catch(err=>{
                return status(500).json({
                    msg: 'catch an err',
                    Error: err
                })    
            });
    })