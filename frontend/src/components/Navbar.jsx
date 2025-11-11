import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice.js';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((s) => s.auth.token);

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="text-lg font-semibold">Task Manager</Link>
        <div className="space-x-3">
          {!token && (
            <>
              <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">Login</Link>
              <Link to="/register" className="text-sm text-gray-600 hover:text-gray-900">Register</Link>
            </>
          )}
          {token && (
            <button onClick={onLogout} className="text-sm text-red-600 hover:text-red-800">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}
