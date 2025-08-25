import { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAdd({ title, dueDate });
    setTitle('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-3 py-2 rounded"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Task</button>
    </form>
  );
};

export default TaskForm;
