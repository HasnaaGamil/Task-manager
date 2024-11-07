// src/routes/taskRoutes.js

const express = require('express');
const { createTask, getTasks, updateTask, deleteTask ,filterTask} = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect routes that require authentication
router.post('/', protect, createTask);  // Create a new task
router.get('/', protect, getTasks);
router.get('/filter', protect, filterTask);    // Get all tasks
router.put('/:taskId', protect, updateTask);  // Update task by ID
router.delete('/:taskId', protect, deleteTask);  // Delete task by ID

module.exports = router;
