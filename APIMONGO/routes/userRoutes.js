const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/getuser/:userId", async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (user == null) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/postuser", async (req, res) => {
    const user = new User({
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/putuser/:userId", async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (user == null) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.age = req.body.age || user.age;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/deleteuser/:userId", async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (user == null) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.remove();
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
