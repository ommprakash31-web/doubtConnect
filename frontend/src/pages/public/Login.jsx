import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import StatusMessage from '../../components/StatusMessage';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithResponse } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      loginWithResponse(data);
      navigate(data.user.role === 'mentor' ? '/mentor/dashboard' : '/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <form onSubmit={submit} className="card">
        <h1 className="text-3xl font-black">Welcome back</h1>
        <p className="mt-2 text-slate-600">Login to continue learning.</p>
        <StatusMessage error={error} />
        <div className="mt-6 grid gap-4">
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="btn-primary" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </div>
        <p className="mt-5 text-sm text-slate-600">New here? <Link className="font-semibold text-blue-700" to="/register/student">Student register</Link> or <Link className="font-semibold text-purple-700" to="/register/mentor">Mentor register</Link></p>
      </form>
    </section>
  );
};

export default Login;
