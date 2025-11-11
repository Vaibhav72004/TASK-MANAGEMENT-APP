import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Navbar from './components/Navbar.jsx';

function PrivateRoute({ children }) {
  const token = useSelector((s) => s.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
