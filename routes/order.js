const router = require('express').Router();
const Order = require('../models/order');


router.get('/',(req,res)=>{
    Order.find()
        .select('name price _id')
        .limit(10)
        .sort({"price": 1})
        .exec()
        .then(result=>{
            var response = result.map(data=>{
                return {
                    name: data.name,
                    ProductID: data.ProductID,
                    request: {
                        type: 'GET',
                        url: 'https://localhost:3000/orders/'+data._id
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

router.post('/',(req,res)=>{
    const newOrder = new Order();
    newOrder.name = req.body.name;
    newOrder.ProductID  = req.body.ProductID;

    newOrder.save()
    .then((data)=>{
    return res.status(200).json({
        msg: 'successfully new product created',
        request: {
            type: 'POST',
            url: 'https://localhost:3000/orders'
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

router.get('/:id',(req,res)=>{
    var id= req.params.id;
    Order.findOne({_id: id})
            .then(data=>{
                return res.status(200).json({
                    msg: 'successfully you got result',
                    name: data.name,
                    _id: data._id,
                    ProductID: data.ProductID,
                    request: {
                        type: 'GET',
                        url: 'https://localhost:3000/orders/'+_id
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
    Order.remove({_id: id})
            .then(()=>{
                return res.status(200).json({
                    msg: 'this order is deleted',
                    request: {
                        type: 'GET',
                        url: 'https://localhost:3000/orders/'+_id
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
