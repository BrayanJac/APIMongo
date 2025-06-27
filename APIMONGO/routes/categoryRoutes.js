const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/getcategory/:categoryId", async (req, res) => {
    try {
        const category = await Category.findOne({ categoryId: req.params.categoryId });
        if (category == null) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/postcategory", async (req, res) => {
    const category = new Category({
        categoryId: req.body.categoryId,
        name: req.body.name,
        description: req.body.description
    });
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/putcategory/:categoryId", async (req, res) => {
    try {
        const category = await Category.findOne({ categoryId: req.params.categoryId});
        if (category == null) {
            return res.status(404).json({ message: "Category not found" });
        }
        category.name = req.body.name || category.name;
        category.description = req.body.description || category.description;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/deletecategory/:categoryId", async (req, res) => {
    try {
        const category = await Category.findOne({ categoryId: req.params.categoryId });
        if (category == null) {
            return res.status(404).json({ message: "Category not found" });
        }
        await category.deleteOne();
        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
