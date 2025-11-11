export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <div className="bg-white p-4 rounded shadow flex items-start justify-between">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
        <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {task.status}
        </span>
      </div>
      <div className="space-x-2">
        <button onClick={onToggle} className="text-xs text-blue-600 hover:underline">Toggle</button>
        <button onClick={onEdit} className="text-xs text-indigo-600 hover:underline">Edit</button>
        <button onClick={onDelete} className="text-xs text-red-600 hover:underline">Delete</button>
      </div>
    </div>
  );
}
