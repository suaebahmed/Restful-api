const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    ProductID: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Order',productSchema);