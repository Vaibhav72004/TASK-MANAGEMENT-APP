import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['pending', 'completed']).default('pending'),
});

export default function TaskForm({ onSubmit, initial, isEditing = false, onCancel }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initial || { title: '', description: '', status: 'pending' },
  });

  useEffect(() => { reset(initial || { title: '', description: '', status: 'pending' }); }, [initial, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow space-y-2">
      <input className="w-full border rounded px-3 py-2" placeholder="Title" {...register('title')} />
      {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
      <textarea className="w-full border rounded px-3 py-2" placeholder="Description" rows={3} {...register('description')} />
      <select className="w-full border rounded px-3 py-2" {...register('status')}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <div className="flex items-center gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{isEditing ? 'Update' : 'Save'}</button>
        {isEditing && (
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded border">Cancel</button>
        )}
      </div>
    </form>
  );
}
