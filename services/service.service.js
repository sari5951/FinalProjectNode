const Product = require('../models/service.model');

exports.createProduct = async (name, price, businessId) => {
    const product = new Product({ name, price, business: businessId });
    await product.save();
    return product;
};

exports.updateProduct = async (id, name, price) => {
    return await Product.findByIdAndUpdate(id, { name, price }, { new: true });
};

exports.deleteProduct = async (id) => {
    await Product.findByIdAndDelete(id);
};