const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true},
    imageUrl: { type: String, required: true},
    price: { type: Number, required: true},
    quantity: { type: Number, required: true },
    category: { type: String, required: true},
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
