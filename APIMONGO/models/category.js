const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryId: { type: Number},
    name: {type: String},
    description: {type: String}
}, { collection: "categories" });

module.exports = mongoose.model("categories", categorySchema);
