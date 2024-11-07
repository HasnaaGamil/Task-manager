// src/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your name'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name must be less than 50 characters'],
      validate: {
        validator: function (value) {
          // Ensure the name only contains alphabetic characters
          return /^[a-zA-Z\s]+$/.test(value);
        },
        message: 'Name must only contain alphabetic characters',
      },
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true, // Ensure email is unique in the database
      validate: [validator.isEmail, 'Please add a valid email'], // Use validator to check if it's a valid email
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
  },
  { timestamps: true }
);

// Hash password before saving the user to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
