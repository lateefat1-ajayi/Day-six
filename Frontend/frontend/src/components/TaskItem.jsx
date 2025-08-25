const TaskItem = ({ task, onDelete, onEdit, onToggle }) => {
  return (
    <div className="bg-white shadow-sm p-4 rounded flex justify-between items-center mb-2">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id, !task.completed)}
          className="w-5 h-5 accent-green-600"
        />
        <div>
          <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          {task.dueDate && (
            <p className="text-sm text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-600 border border-blue-600 px-2 py-1 rounded hover:bg-blue-50"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
