const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todoList: { type: [String], default: [] }, // Store tasks as an array of strings
});

const User = mongoose.model("User", userSchema);

module.exports = User;
