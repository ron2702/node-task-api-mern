const Task = require('../models/Task');

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for the authenticated user
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       '401':
 *         description: Unauthorized (JWT token not provided or invalid)
 */
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ message: 'Error al obtener tareas' });
    }
};

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task for the authenticated user
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Finish the project
 *               description:
 *                 type: string
 *                 example: Add documentation and deploy it.
 *     responses:
 *       '201':
 *         description: Task created successfully
 *       '401':
 *         description: Unauthorized (JWT token not provided or invalid)
 *       '400':
 *         description: Bad request (e.g. missing title)
 */
exports.createTask = async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            user: req.user._id,
        }); 
        const taskSaved = await newTask.save();

        res.status(201).json(taskSaved);
    } catch (error) {
        console.error('Error al crear tarea:', error);
        res.status(500).json({ message: 'Error al crear tarea' });
    }
};

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID for the authenticated user
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Task not found or user not authorized to view it
 */
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada o no tienes permiso para verla' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Error al obtener tarea:', error);
        res.status(500).json({ message: 'Error al obtener tarea' });
    }
};

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID for the authenticated user
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Finish the project
 *               description:
 *                 type: string
 *                 example: Add documentation and deploy it.
 *     responses:
 *       '200':
 *         description: Successfully updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Task not found or user not authorized to update it
 */

exports.updateTask = async (req, res) => {
    try {

        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada o no tienes permiso para actualizarla' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        res.status(500).json({ message: 'Error al actualizar tarea' });
    }
}

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID for the authenticated user
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Successfully deleted task
 *       '404':
 *         description: Task not found or user not authorized to delete it
 */
exports.deleteTask = async (req, res) => {

  try {

    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada o no tienes permiso para eliminarla' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).json({ message: 'Error al eliminar tarea' });
  }

}; 