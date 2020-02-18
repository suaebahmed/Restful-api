const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ProductID: new mongoose.Schema.Types.ObjectId(),
    name: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Order',productSchema);