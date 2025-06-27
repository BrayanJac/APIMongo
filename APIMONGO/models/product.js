const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: {type: Number},
    name: {type: String},
    description: {type: String},
    price: {type: Number},
    stock: {type: Number},
}, { collection: "products" });

module.exports = mongoose.model("products", productSchema);
