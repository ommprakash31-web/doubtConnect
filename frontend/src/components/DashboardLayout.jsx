import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const studentLinks = [
  ['Dashboard', '/student/dashboard'],
  ['Ask Doubt', '/student/ask-doubt'],
  ['My Doubts', '/student/my-doubts'],
  ['Notes Library', '/student/notes'],
  ['AI Solver', '/student/ai-solver'],
  ['Profile', '/student/profile']
];

const mentorLinks = [
  ['Dashboard', '/mentor/dashboard'],
  ['Available Doubts', '/mentor/available-doubts'],
  ['Upload Notes', '/mentor/upload-notes'],
  ['My Notes', '/mentor/my-notes'],
  ['Profile', '/mentor/profile']
];

const DashboardLayout = ({ title, children }) => {
  const { user } = useAuth();
  const links = user?.role === 'mentor' ? mentorLinks : studentLinks;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-3xl bg-gradient-to-b from-blue-700 to-purple-700 p-4 text-white shadow-xl lg:sticky lg:top-24">
          <p className="px-3 text-sm uppercase tracking-[0.3em] text-blue-100">{user?.role} panel</p>
          <h2 className="mt-2 px-3 text-2xl font-bold">Hi, {user?.name}</h2>
          <div className="mt-6 grid gap-2">
            {links.map(([label, path]) => (
              <NavLink key={path} to={path} className={({ isActive }) => `rounded-2xl px-4 py-3 font-medium transition ${isActive ? 'bg-white text-blue-700' : 'text-blue-50 hover:bg-white/10'}`}>
                {label}
              </NavLink>
            ))}
          </div>
        </aside>
        <main>
          <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">DoubtConnect</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
