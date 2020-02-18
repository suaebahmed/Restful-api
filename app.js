const express = require('express');
const app = express();

app.use((req,res,next)=>{
    const error = new Error('Not found')
    const statusCode = 404;
    return next();
});
app.use((req,res,next)=>{
    return res.status(404).json({
        msg: 'wrong url'
    })
})

app.use('/products',require('./routes/product'));
app.use('/orders',require('./routes/order'));

app.listen(3000,function(){
    console.log('your app is listening port on 3000....');
});
