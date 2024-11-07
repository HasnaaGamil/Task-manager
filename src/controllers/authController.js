// src/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user instance with validation from the User model
    const user = new User({ name, email, password });
    
    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // If validation fails, Mongoose validation error will be caught here
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') }); // Return validation error message
    }

    // For other errors (e.g., server issues)
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: "'email' field is required in the request body." });
  }
  else if (password === undefined) {
    return res.status(400).json({ message: "'password' field is required in the request body." });
  }
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    // Check if the password matches the stored hash
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token in response
    res.json({ token });
  } catch (error) {
    // Handle other errors (e.g., database issues, JWT signing failures)
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
