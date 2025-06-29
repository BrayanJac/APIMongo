const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/getproduct/:productId", async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.productId });
        if (product == null) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/postproduct", async (req, res) => {
    const product = new Product({
        productId: req.body.productId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock        
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/putproduct/:productId", async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.productId });
        if (product == null) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description,
        product.price = req.body.price || product.price,
        product.stock = req.body.stock || product.stock;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/deleteproduct/:productId", async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.productId});
        if (product == null) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.deleteOne();
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/products/inventory", async (req, res) => {
    try {
        const products = await Product.find();

        let totalValue = 0;
        products.forEach(p => {
            totalValue += p.price * p.stock;
        });

        res.json({
            totalInventoryValue: totalValue
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
