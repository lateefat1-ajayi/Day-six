import Task from '../models/Task.js';


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};


export const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      dueDate,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task' });
  }
};


export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task' });
  }
};




export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    console.log('PATCH Body:', req.body); // ✅ Debug log

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // ✅ Proper user ownership check
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    task.completed = completed;
    const updated = await task.save();

    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating task status:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
