const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
});

module.exports = mongoose.model('Product', productSchema);