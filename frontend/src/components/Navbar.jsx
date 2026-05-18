import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-black text-blue-700">DoubtConnect</Link>
        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/about" className="font-medium text-slate-600 hover:text-blue-700">About</NavLink>
          {user ? (
            <>
              <NavLink to={user.role === 'mentor' ? '/mentor/dashboard' : '/student/dashboard'} className="font-medium text-slate-600 hover:text-blue-700">Dashboard</NavLink>
              <button onClick={handleLogout} className="btn-secondary py-2">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="font-medium text-slate-600 hover:text-blue-700">Login</NavLink>
              <Link to="/register/student" className="btn-primary py-2">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
