const User = require("./models/users");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
DBLINK = process.env.DB_URL;

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Redirect to sign-up." });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Return user data, including todoList, on successful login
    res.status(200).json({
      message: "Login successful",
      redirectTo: `/user/${user._id}`,
      id: user._id,
      user: {
        username: user.username,
        todoList: user.todoList,
      }, // Send the user's todoList
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/getitem", async (req, res) => {
  const { username } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Redirect to sign-up." });
    }

    // Check password

    // Return user data, including todoList, on successful login
    res.status(200).json({
      message: "Login successful",
      redirectTo: `/user/${user._id}`,
      user: {
        todoList: user.todoList,
      }, // Send the user's todoList
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Sign Up Route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user with an empty todoList
    const newUser = new User({ username, password, todoList: [] });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      redirectTo: `/user/${newUser._id}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/user/updateTodoList", async (req, res) => {
  const { username, todoList } = req.body;

  try {
    // Validate input
    if (!username || !Array.isArray(todoList)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate each item in the todoList
    for (const todo of todoList) {
      if (!todo.title || !todo.description) {
        return res
          .status(400)
          .json({ message: "Each todo must have a title and description" });
      }
    }

    // Update the todoList
    user.todoList = todoList;
    await user.save();

    res.status(200).json({ message: "Todo list updated successfully", user });
  } catch (err) {
    console.error("Error updating todo list:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5000);
mongoose
  .connect(DBLINK)
  .then(() => {
    console.log("conneted");
  })
  .catch((err) => {
    console.log(err.message);
  });
