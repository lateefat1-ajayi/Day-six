import { useState } from 'react';

const EditForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState(task.dueDate?.slice(0, 10) || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, title, dueDate });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        className="w-full px-4 py-2 border rounded"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
