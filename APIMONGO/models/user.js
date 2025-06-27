const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: Number},
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String},
    password: { type: String},
    userType: { type: String},
    address: { type: String},
    phoneNumber: { type: String}
}, { collection: "users" });

module.exports = mongoose.model("users", userSchema);
