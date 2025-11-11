import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const schema = z.object({
  username: z.string().min(3, 'Min 3 characters'),
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Min 8 characters'),
});

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector((s) => s.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => dispatch(registerUser(data));

  useEffect(() => { if (token) navigate('/dashboard'); }, [token, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow space-y-2">
        <input className="w-full border rounded px-3 py-2" placeholder="Username" {...register('username')} />
        {errors.username && <p className="text-xs text-red-600">{errors.username.message}</p>}
        <input className="w-full border rounded px-3 py-2" placeholder="Email" {...register('email')} />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" {...register('password')} />
        {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button disabled={loading} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">{loading ? 'Loading...' : 'Create Account'}</button>
      </form>
      <p className="text-sm">Have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
    </div>
  );
}
