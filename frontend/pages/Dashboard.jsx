import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../src/components/TaskForm';
import TaskItem from '../src/components/TaskItem';
import { AuthContext } from '../src/context/AuthContext';
import EditForm from '../src/components/EditForm';
import API from '../src/services/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      toast.error('Failed to fetch tasks');
    }
  };

  const handleAdd = async (taskData) => {
    try {
      const res = await API.post('/tasks', taskData);
      setTasks([res.data, ...tasks]);
      toast.success('Task added!');
    } catch (err) {
      console.error('Error adding task:', err);
      toast.error('Failed to add task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success('Task deleted!');
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Failed to delete task');
    }
  };

  const handleEdit = async (updatedTask) => {
    try {
      const res = await API.put(`/tasks/${updatedTask._id}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === updatedTask._id ? res.data : task)));
      setEditingTask(null);
      toast.success('Task updated!');
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('Failed to update task');
    }
  };

 const handleToggle = async (id, completed) => {
  try {
    const res = await API.patch(`/tasks/${id}`, { completed });
    setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    toast.success(`Task marked as ${completed ? 'completed' : 'incomplete'}`);
  } catch (err) {
    console.error('Toggle failed', err);
    toast.error('Could not update task status');
  }
};



  const startEdit = (task) => setEditingTask(task);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Welcome to TaskMate</h1>

      <div className="bg-white p-6 rounded shadow-md mb-6">
        {editingTask ? (
          <EditForm
            task={editingTask}
            onSave={handleEdit}
            onCancel={() => setEditingTask(null)}
          />
        ) : (
          <TaskForm onAdd={handleAdd} />
        )}
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>

        {loading ? (
          <p className="text-gray-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-600">No tasks yet. Add one above!</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onEdit={startEdit}
              onToggle={handleToggle}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
