const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(protect, taskController.getAllTasks)
    .post(protect, taskController.createTask);

router.route('/:id')
    .get(protect, taskController.getTaskById)
    .put(protect, taskController.updateTask)
    .delete(protect, taskController.deleteTask);

module.exports = router;