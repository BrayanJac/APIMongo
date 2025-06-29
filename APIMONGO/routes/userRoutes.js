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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
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
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.userType = req.body.userType || user.userType;
        user.address = req.body.address || user.address;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
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
        await user.deleteOne();
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
