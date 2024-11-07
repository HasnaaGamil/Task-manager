// src/controllers/taskController.js

const Task = require('../models/Task');

// Create a task
const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    // Create new task instance with validation from the Task model
    const task = new Task({
      title,
      description,
      dueDate,
      user: req.user._id, // Assuming req.user._id is set from authentication middleware
    });

    // Save the task to the database
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    // Catch validation errors from Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message }); // Return validation error message
    }
    // For other errors (e.g., server issues)
    res.status(500).json({ message: error.message });
  }
};

//Get all tasks
const getTasks = async (req, res) => {
  try {
    // Retrieve tasks associated with the authenticated user
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const filterTask = async (req, res) => {
  const { completed } = req.body; // Get 'completed' from the request body

  // Check if 'completed' is provided in the body
  if (completed === undefined) {
    return res.status(400).json({ message: "'completed' field is required in the request body." });
  }

  const filter = { user: req.user._id };

  // If 'completed' is provided, add it to the filter
  filter.completed = completed;

  try {
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, completed, dueDate } = req.body;

  try {
    // Update the task and return the updated task
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user._id },
      { title, description, completed, dueDate },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    // Catch validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    // Attempt to delete the task based on its ID and the authenticated user
    const task = await Task.findOneAndDelete({ _id: taskId, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask,filterTask };
