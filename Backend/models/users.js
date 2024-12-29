const mongoose = require("mongoose");
const todoItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  todoList: { type: [todoItemSchema], default: [] },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
