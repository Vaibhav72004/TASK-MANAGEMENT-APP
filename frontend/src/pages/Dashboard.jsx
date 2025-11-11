import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, deleteTask, fetchTasks, updateTask } from '../redux/slices/taskSlice.js';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((s) => s.tasks);
  const [editing, setEditing] = useState(null);

  useEffect(() => { dispatch(fetchTasks()); }, [dispatch]);

  const handleCreate = (data) => {
    if (editing) {
      dispatch(updateTask({ id: editing._id, data })).then(() => setEditing(null));
    } else {
      dispatch(createTask(data));
    }
  };

  const toggleStatus = (t) => {
    const newStatus = t.status === 'pending' ? 'completed' : 'pending';
    dispatch(updateTask({ id: t._id, data: { status: newStatus } }));
  };

  const removeTask = (t) => { dispatch(deleteTask(t._id)); };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <TaskForm onSubmit={handleCreate} initial={editing || undefined} isEditing={!!editing} onCancel={() => setEditing(null)} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <TaskList
        tasks={items}
        onToggle={toggleStatus}
        onDelete={removeTask}
        onEdit={setEditing}
      />
    </div>
  );
}
