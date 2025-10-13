const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ message: 'Error al obtener tareas' });
    }
};

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
}

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