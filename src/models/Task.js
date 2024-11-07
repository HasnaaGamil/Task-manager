// src/models/Task.js

const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title must be less than 100 characters long'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [5, 'Description must be at least 5 characters long'],
      maxlength: [500, 'Description must be less than 500 characters long'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > Date.now(); // Ensure the due date is in the future
        },
        message: 'Due date must be in the future',
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
