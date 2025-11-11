import { Task } from '../model/Task.js';

export async function listTasks(req, res) {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ tasks });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
}

export async function createTask(req, res) {
  try {
    const { title, description = '', status = 'pending' } = req.body;
    if (!title) return res.status(400).json({ message: 'title is required' });

    const task = await Task.create({ title, description, status, userId: req.user.id });
    return res.status(201).json({ message: 'Task created', task });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    await task.save();

    return res.status(200).json({ message: 'Task updated', task });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
}

export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    return res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete task', error: err.message });
  }
}
