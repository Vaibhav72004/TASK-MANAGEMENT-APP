import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (!tasks.length) return <p className="text-sm text-gray-600">No tasks yet.</p>;
  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <TaskItem
          key={t._id}
          task={t}
          onToggle={() => onToggle(t)}
          onDelete={() => onDelete(t)}
          onEdit={() => onEdit(t)}
        />)
      )}
    </div>
  );
}
