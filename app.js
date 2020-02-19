const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const url = 'mongodb://127.0.0.1:27017/restfulApi';
mongoose.connect(url, {  useUnifiedTopology: true , useNewUrlParser: true });
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
});
db.on('error', err => {
  console.error('connection error:', err)
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/users',require('./routes/user'));
app.use('/products',require('./routes/product'));
app.use('/orders',require('./routes/order'));


app.use((req,res,next)=>{
    const error = new Error('Not found')
    const statusCode = 404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(404).json({
        msg: 'errro handling',
        error: {
            message: error.message
        }
    })
})

app.listen(3000,function(){
    console.log('your app is listening port on 3000....');
});
