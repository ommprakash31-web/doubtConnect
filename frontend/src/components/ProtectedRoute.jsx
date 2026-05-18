import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-10 text-center text-slate-500">Loading your workspace...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'mentor' ? '/mentor/dashboard' : '/student/dashboard'} replace />;
  }

  return children;
};

export default ProtectedRoute;
