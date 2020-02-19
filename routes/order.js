const router = require('express').Router();
const Order = require('../models/order');
const checkAuth = require('../middleware/check-auth');


router.get('/',checkAuth,(req,res)=>{
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
                        url: 'http://localhost:3000/orders/'+data._id  // wrong https -> http
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
            return res.status(500).json({
                msg: 'catch an err',
                Error: err
            })    
        })
});

router.post('/',checkAuth,(req,res)=>{
    const newOrder = new Order();
    newOrder.name = req.body.name;
    newOrder.ProductID  = req.body.ProductID;
    //console.log(newOrder)
    newOrder.save()
    .then((data)=>{
    return res.status(200).json({
        msg: 'successfully new product created',
        request: {
            type: 'POST',
            url: 'http://localhost:3000/orders'
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
router.get('/:productID',checkAuth,(req,res)=>{
        var id= req.params.productID;
        //console.log(id)
        Order.findById(id)
            .exec()
            .then(data=>{
                //console.log(data)
                return res.status(200).json({
                    msg: 'successfully you got result',
                    name: data.name,
                    _id: data._id,
                    ProductID: data.ProductID,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/'+data._id
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

router.delete('/:id',checkAuth,(req,res)=>{
        var id= req.params.id;
        //console.log(id)
        Order.remove({_id: id})
                .then(()=>{
                return res.status(200).json({
                    msg: 'this order is deleted',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/'
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

module.exports = router
